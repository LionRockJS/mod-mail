
CREATE TABLE webhooks(
    id INTEGER UNIQUE DEFAULT ((( strftime('%s','now') - 1563741060 ) * 100000) + (RANDOM() & 65535)) NOT NULL ,
    uuid TEXT UNIQUE DEFAULT (lower(hex( randomblob(4)) || '-' || hex( randomblob(2)) || '-' || '4' || substr( hex( randomblob(2)), 2)
    || '-' || substr('AB89', 1 + (abs(random()) % 4) , 1) || substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))) ) NOT NULL ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    service TEXT NOT NULL ,
    type TEXT NOT NULL ,
    value TEXT NOT NULL ,
    entity TEXT ,
    entity_id TEXT ,
    email TEXT ,
    user_key TEXT ,
    user_value TEXT
);
CREATE TRIGGER webhooks_updated_at AFTER UPDATE ON webhooks WHEN old.updated_at < CURRENT_TIMESTAMP BEGIN
    UPDATE webhooks SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;
