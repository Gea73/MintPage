-- migrate:up
CREATE TABLE card_labels(
    id UUID NOT NULL,
    card_id UUID NOT NULL,
    label_id UUID NOT NULL,
    "version" BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    card_labels ADD PRIMARY KEY(id);
ALTER TABLE
    card_labels ADD CONSTRAINT card_labels_card_id_foreign FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE;
ALTER TABLE
    card_labels ADD CONSTRAINT card_labels_label_id_foreign FOREIGN KEY(label_id) REFERENCES labels(id) ON DELETE CASCADE;


-- migrate:down
DROP TABLE IF EXISTS card_labels CASCADE
