CREATE TABLE referral_codes (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE leads (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    referral_code VARCHAR(50),
    campaign VARCHAR(100),
    source VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    converted_user_id VARCHAR(36),
    created_at TIMESTAMP NOT NULL,
    converted_at TIMESTAMP
);

CREATE TABLE referrals (
    id VARCHAR(36) PRIMARY KEY,
    referrer_user_id VARCHAR(36) NOT NULL,
    referred_user_id VARCHAR(36) NOT NULL,
    referral_code VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_leads_referral_code ON leads(referral_code);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_user_id);