-- Migration: Update test user emails from @testmail.com to @libraryms.com
-- and update passwords from test123 to test1234
-- BCrypt hash for 'test1234': $2a$10$eJdGjcLT0zWWsKyOBoUNNuIQzNXOzks8c/54pG6mEbuxiRV4q2Pyq

USE `md8id2hgb8635iss`;

-- Update email and password for Alice
UPDATE `app_user`
SET `email` = 'alice@libraryms.com',
    `password` = '$2a$10$eJdGjcLT0zWWsKyOBoUNNuIQzNXOzks8c/54pG6mEbuxiRV4q2Pyq'
WHERE `email` = 'alice@testmail.com';

-- Update email and password for Bob
UPDATE `app_user`
SET `email` = 'bob@libraryms.com',
    `password` = '$2a$10$eJdGjcLT0zWWsKyOBoUNNuIQzNXOzks8c/54pG6mEbuxiRV4q2Pyq'
WHERE `email` = 'bob@testmail.com';

-- Update email and password for Carol
UPDATE `app_user`
SET `email` = 'carol@libraryms.com',
    `password` = '$2a$10$eJdGjcLT0zWWsKyOBoUNNuIQzNXOzks8c/54pG6mEbuxiRV4q2Pyq'
WHERE `email` = 'carol@testmail.com';

-- Also update any references in related tables (checkout, history, messages, reviews)
-- that store user email

UPDATE `checkout`
SET `user_email` = 'alice@libraryms.com'
WHERE `user_email` = 'alice@testmail.com';

UPDATE `checkout`
SET `user_email` = 'bob@libraryms.com'
WHERE `user_email` = 'bob@testmail.com';

UPDATE `checkout`
SET `user_email` = 'carol@libraryms.com'
WHERE `user_email` = 'carol@testmail.com';

UPDATE `History`
SET `user_email` = 'alice@libraryms.com'
WHERE `user_email` = 'alice@testmail.com';

UPDATE `History`
SET `user_email` = 'bob@libraryms.com'
WHERE `user_email` = 'bob@testmail.com';

UPDATE `History`
SET `user_email` = 'carol@libraryms.com'
WHERE `user_email` = 'carol@testmail.com';

UPDATE `messages`
SET `user_email` = 'alice@libraryms.com'
WHERE `user_email` = 'alice@testmail.com';

UPDATE `messages`
SET `user_email` = 'bob@libraryms.com'
WHERE `user_email` = 'bob@testmail.com';

UPDATE `messages`
SET `user_email` = 'carol@libraryms.com'
WHERE `user_email` = 'carol@testmail.com';

UPDATE `review`
SET `user_email` = 'alice@libraryms.com'
WHERE `user_email` = 'alice@testmail.com';

UPDATE `review`
SET `user_email` = 'bob@libraryms.com'
WHERE `user_email` = 'bob@testmail.com';

UPDATE `review`
SET `user_email` = 'carol@libraryms.com'
WHERE `user_email` = 'carol@testmail.com';
