-- migrate:up
CREATE TABLE "card-labels"(
    id UUID NOT NULL,
    card_id UUID NOT NULL,
    label_id UUID NOT NULL,
    "version" BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT NOW());
ALTER TABLE
    "card-labels" ADD PRIMARY KEY(id);
ALTER TABLE
    "card-labels" ADD CONSTRAINT card_labels_card_id_foreign FOREIGN KEY(card_id) REFERENCES cards(id);
ALTER TABLE
    "card-labels" ADD CONSTRAINT card_labels_label_id_foreign FOREIGN KEY(label_id) REFERENCES labels(id);


-- migrate:down
DROP TABLE IF EXISTS "card-labels" CASCADE
