package com.luv2read.springbootlibrary.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSchemaFixer {

    private static final Logger log = LoggerFactory.getLogger(DatabaseSchemaFixer.class);

    private final JdbcTemplate jdbcTemplate;

    public DatabaseSchemaFixer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fixHistoryTableSchema() {
        // Check which table name exists (case-sensitive on Linux MySQL)
        String tableName = findHistoryTableName();
        if (tableName == null) {
            log.warn("History table not found - Hibernate ddl-auto should create it");
            return;
        }

        log.info("Found history table as: '{}'", tableName);

        // If table exists as lowercase 'history', rename to 'History' to match entity
        if ("history".equals(tableName)) {
            try {
                jdbcTemplate.execute("RENAME TABLE `history` TO `History`");
                log.info("Renamed table 'history' -> 'History'");
                tableName = "History";
            } catch (Exception e) {
                log.warn("Could not rename history table: {}", e.getMessage());
            }
        }

        // Fix column types
        try {
            jdbcTemplate.execute("ALTER TABLE `" + tableName + "` MODIFY COLUMN `description` TEXT");
            jdbcTemplate.execute("ALTER TABLE `" + tableName + "` MODIFY COLUMN `img` LONGTEXT");
            log.info("History table columns verified/updated successfully");
        } catch (Exception e) {
            log.warn("Could not alter History table columns (may already be correct): {}", e.getMessage());
        }
    }

    private String findHistoryTableName() {
        try {
            var tables = jdbcTemplate.queryForList(
                "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND LOWER(TABLE_NAME) = 'history'"
            );
            if (!tables.isEmpty()) {
                return (String) tables.get(0).get("TABLE_NAME");
            }
        } catch (Exception e) {
            log.warn("Could not query for History table: {}", e.getMessage());
        }
        return null;
    }
}
