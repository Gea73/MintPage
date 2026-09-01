\restrict dbmate

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg12+2)
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: card_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.card_status AS ENUM (
    'pending',
    'done'
);


--
-- Name: member_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.member_role AS ENUM (
    'owner',
    'admin',
    'editor',
    'reader'
);


--
-- Name: token_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.token_status AS ENUM (
    'valid',
    'expired',
    'revoked'
);


--
-- Name: user_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_status AS ENUM (
    'unverified',
    'verified',
    'suspended'
);


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.board_members (
    id uuid NOT NULL,
    board_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role public.member_role NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: boards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.boards (
    id uuid NOT NULL,
    owner_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: card_labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.card_labels (
    id uuid NOT NULL,
    card_id uuid NOT NULL,
    label_id uuid NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cards (
    id uuid NOT NULL,
    list_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    "position" text NOT NULL COLLATE pg_catalog."C",
    status public.card_status DEFAULT 'pending'::public.card_status NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.labels (
    id uuid NOT NULL,
    board_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    color_hex character varying(7) NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    CONSTRAINT labels_color_hex_check CHECK (((color_hex)::text ~ '^#[0-9A-Fa-f]{6}$'::text))
);


--
-- Name: lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lists (
    id uuid NOT NULL,
    board_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "position" text NOT NULL COLLATE pg_catalog."C",
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    id uuid NOT NULL,
    hash character varying(255) NOT NULL,
    user_id uuid NOT NULL,
    status public.token_status NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    expires_at timestamp(0) without time zone DEFAULT (now() + '01:00:00'::interval) NOT NULL,
    used_at timestamp(0) without time zone NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: session_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session_tokens (
    id uuid NOT NULL,
    hash character varying(255) NOT NULL,
    user_id uuid NOT NULL,
    status public.token_status NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    expires_at timestamp(0) without time zone DEFAULT (now() + '7 days'::interval) NOT NULL,
    used_at timestamp(0) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    status public.user_status DEFAULT 'unverified'::public.user_status NOT NULL,
    created_at timestamp(0) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT now() NOT NULL
);


--
-- Name: board_members board_member_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.board_members
    ADD CONSTRAINT board_member_unique UNIQUE (board_id, user_id);


--
-- Name: board_members board_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.board_members
    ADD CONSTRAINT board_members_pkey PRIMARY KEY (id);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: card_labels card_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card_labels
    ADD CONSTRAINT card_labels_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: session_tokens session_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_tokens
    ADD CONSTRAINT session_tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: board_members board_members_update_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER board_members_update_updated_at BEFORE UPDATE ON public.board_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: boards boards_update_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER boards_update_updated_at BEFORE UPDATE ON public.boards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: cards cards_update_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER cards_update_updated_at BEFORE UPDATE ON public.cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: labels labels_update_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER labels_update_updated_at BEFORE UPDATE ON public.labels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: lists lists_update_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER lists_update_updated_at BEFORE UPDATE ON public.lists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: users users_update_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER users_update_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: board_members board_members_board_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.board_members
    ADD CONSTRAINT board_members_board_id_foreign FOREIGN KEY (board_id) REFERENCES public.boards(id) ON DELETE CASCADE;


--
-- Name: board_members board_members_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.board_members
    ADD CONSTRAINT board_members_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: boards boards_owner_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_owner_id_foreign FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: card_labels card_labels_card_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card_labels
    ADD CONSTRAINT card_labels_card_id_foreign FOREIGN KEY (card_id) REFERENCES public.cards(id) ON DELETE CASCADE;


--
-- Name: card_labels card_labels_label_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card_labels
    ADD CONSTRAINT card_labels_label_id_foreign FOREIGN KEY (label_id) REFERENCES public.labels(id) ON DELETE CASCADE;


--
-- Name: cards cards_list_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_list_id_foreign FOREIGN KEY (list_id) REFERENCES public.lists(id) ON DELETE CASCADE;


--
-- Name: labels labels_board_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_board_id_foreign FOREIGN KEY (board_id) REFERENCES public.boards(id) ON DELETE CASCADE;


--
-- Name: lists lists_board_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_board_id_foreign FOREIGN KEY (board_id) REFERENCES public.boards(id) ON DELETE CASCADE;


--
-- Name: password_reset_tokens password_reset_tokens_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: session_tokens session_tokens_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_tokens
    ADD CONSTRAINT session_tokens_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20260830140332'),
    ('20260830142212'),
    ('20260830150000'),
    ('20260830151504'),
    ('20260830151510'),
    ('20260830151522'),
    ('20260830151529'),
    ('20260830151535'),
    ('20260830151541'),
    ('20260830153511');
