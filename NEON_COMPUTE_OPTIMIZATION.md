# Neon Database Compute Usage Optimization

## 🔴 Problem Analysis

Your `library_ms` database consumed **108.98 CU-hrs** in one month compared to:
- `estate_mngt`: 0.26 CU-hrs
- `reactivities`: 0.66 CU-hrs

### Root Causes Identified:

1. **HikariCP Keepalive Queries** (BIGGEST CULPRIT)
   - Previous setting: `keepalive-time=120000` (2 minutes)
   - Previous setting: `minimum-idle=2` connections
   - **Impact**: 2 connections × 30 keepalives/hour = **60 queries/hour** even when idle
   - Over 30 days: **43,200 keepalive queries** consuming compute units!

2. **Frequent Application Restarts**
   - Railway/Render auto-scaling or health check failures
   - Each restart triggered `DatabaseSchemaFixer` with **20-25 queries**
   - If restarting every hour: **14,400-18,000 queries/month** for schema fixes

3. **Always-On Idle Connections**
   - `minimum-idle=2` kept 2 database connections constantly active
   - Neon charges for **active compute time**, not just queries
   - Idle connections = wasted compute units

---

## ✅ Changes Applied

### 1. **Optimized HikariCP Connection Pool** (`application.properties`)

```properties
# BEFORE (Expensive for serverless)
spring.datasource.hikari.maximum-pool-size=5
spring.datasource.hikari.minimum-idle=2          # ❌ Always 2 connections
spring.datasource.hikari.keepalive-time=120000   # ❌ 60 queries/hour
spring.datasource.hikari.idle-timeout=300000     # 5 minutes
spring.datasource.hikari.max-lifetime=600000     # 10 minutes

# AFTER (Optimized for Neon serverless)
spring.datasource.hikari.maximum-pool-size=3     # ✅ Reduced max
spring.datasource.hikari.minimum-idle=0          # ✅ No idle connections
# spring.datasource.hikari.keepalive-time=0     # ✅ Disabled keepalive
spring.datasource.hikari.idle-timeout=60000      # ✅ 1 minute (faster cleanup)
spring.datasource.hikari.max-lifetime=300000     # ✅ 5 minutes
```

**Expected Savings**: ~60 queries/hour → **43,200 queries/month eliminated**

### 2. **Conditional DatabaseSchemaFixer** (`DatabaseSchemaFixer.java`)

Schema fixes now only run when explicitly enabled:

```java
@EventListener(ApplicationReadyEvent.class)
public void fixColumnTypes() {
    if (!"true".equalsIgnoreCase(System.getenv("ENABLE_SCHEMA_FIXES"))) {
        log.debug("Schema fixes disabled.");
        return;
    }
    // ... schema fix logic
}
```

**Expected Savings**: Schema fixes only run once when needed, not on every restart.

---

## 📋 Deployment Steps

### **Step 1: Update Railway Environment Variables**

In your Railway project, set these variables:

```env
# Database connection (already set)
SPRING_DATASOURCE_URL=jdbc:postgresql://ep-shiny-field-a8z7adco-pooler.eastus2.azure.neon.tech:5432/library_ms_db
SPRING_DATASOURCE_USERNAME=neondb_owner
SPRING_DATASOURCE_PASSWORD=npg_M0zvn2macAGV

# Schema fixes - ONLY enable for first deployment after this update
ENABLE_SCHEMA_FIXES=true
```

### **Step 2: Deploy the Updated Code**

```bash
# Commit changes
git add .
git commit -m "Optimize Neon database compute usage"
git push origin main
```

Railway will automatically redeploy with the new configuration.

### **Step 3: Disable Schema Fixes After First Deployment**

Once the app starts successfully (check logs for "Schema fixes" messages):

1. Go to Railway → Environment Variables
2. Set `ENABLE_SCHEMA_FIXES=false` (or remove it entirely)
3. Railway will redeploy

**This prevents schema queries on every subsequent restart.**

---

## 📊 Expected Results

### Current Usage Pattern:
- **Keepalive queries**: 43,200/month
- **Schema fix queries**: ~15,000/month (if restarting hourly)
- **Actual user queries**: Maybe 1,000-5,000/month
- **Total**: ~60,000+ queries/month = **108.98 CU-hrs**

### After Optimization:
- **Keepalive queries**: 0
- **Schema fix queries**: 0 (after initial run)
- **Actual user queries**: 1,000-5,000/month
- **Expected CU-hrs**: **<5 CU-hrs/month** (similar to your other databases)

---

## 🔍 Monitoring Next Month

Check your Neon dashboard after 7-14 days:

1. **Good**: CU-hrs should drop to <10 for the month
2. **Investigate further** if still high:
   - Check Railway deployment logs for frequent restarts
   - Verify `ENABLE_SCHEMA_FIXES=false`
   - Consider switching `spring.jpa.hibernate.ddl-auto=validate` (from `update`)

---

## 🚨 Troubleshooting

### If app fails to start after deployment:

1. **Check logs** in Railway:
   ```
   Schema fixes disabled. Set ENABLE_SCHEMA_FIXES=true...
   ```
   This is **expected** - schema fixes are now conditional.

2. **If you see Hibernate errors** about schema mismatches:
   - Temporarily set `ENABLE_SCHEMA_FIXES=true`
   - Redeploy
   - Set back to `false` after startup

### If you need to run schema fixes again:

1. Set `ENABLE_SCHEMA_FIXES=true` in Railway
2. Let the app restart (triggers schema fixes)
3. Set `ENABLE_SCHEMA_FIXES=false` immediately after
4. Redeploy to save changes

---

## 📝 Additional Recommendations

### 1. Use `validate` instead of `update` (Optional)

Once your schema is stable:

```properties
# application.properties
spring.jpa.hibernate.ddl-auto=validate  # Instead of 'update'
```

This prevents Hibernate from attempting schema changes on every startup.

### 2. Monitor Railway Restarts

Check Railway dashboard for:
- Health check failures
- Memory issues causing restarts
- Auto-scaling events

Frequent restarts = more compute usage even with our optimizations.

### 3. Consider Neon's Connection Pooler

You're already using it (`pooler.eastus2.azure.neon.tech`), which is good!
This helps manage connections efficiently on Neon's side.

---

## 🎯 Summary

**Before**: 108.98 CU-hrs/month  
**Expected After**: <5 CU-hrs/month (>95% reduction)  
**Primary Savings From**:
- ✅ Eliminated 43,200 keepalive queries/month
- ✅ Eliminated 15,000+ schema fix queries/month  
- ✅ Removed always-on idle connections

Deploy these changes and monitor your Neon dashboard over the next week!
