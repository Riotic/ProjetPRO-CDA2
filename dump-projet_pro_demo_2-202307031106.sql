--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-07-03 11:06:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE projet_pro_demo_2;
--
-- TOC entry 3356 (class 1262 OID 233623)
-- Name: projet_pro_demo_2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE projet_pro_demo_2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';


ALTER DATABASE projet_pro_demo_2 OWNER TO postgres;

\connect projet_pro_demo_2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 233657)
-- Name: demo_proj_2; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA demo_proj_2;


ALTER SCHEMA demo_proj_2 OWNER TO postgres;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 233688)
-- Name: some_diff; Type: TABLE; Schema: demo_proj_2; Owner: postgres
--

CREATE TABLE demo_proj_2.some_diff (
    id integer NOT NULL,
    col1 character varying(50),
    col2 integer,
    col3 date
);


ALTER TABLE demo_proj_2.some_diff OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 233687)
-- Name: some_diff_id_seq; Type: SEQUENCE; Schema: demo_proj_2; Owner: postgres
--

CREATE SEQUENCE demo_proj_2.some_diff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE demo_proj_2.some_diff_id_seq OWNER TO postgres;

--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 221
-- Name: some_diff_id_seq; Type: SEQUENCE OWNED BY; Schema: demo_proj_2; Owner: postgres
--

ALTER SEQUENCE demo_proj_2.some_diff_id_seq OWNED BY demo_proj_2.some_diff.id;


--
-- TOC entry 220 (class 1259 OID 233667)
-- Name: table_diff_1; Type: TABLE; Schema: demo_proj_2; Owner: postgres
--

CREATE TABLE demo_proj_2.table_diff_1 (
    id integer NOT NULL,
    nom character varying(50),
    prenom character varying(50),
    age integer,
    adresse character varying(100)
);


ALTER TABLE demo_proj_2.table_diff_1 OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 233666)
-- Name: table_diff_1_id_seq; Type: SEQUENCE; Schema: demo_proj_2; Owner: postgres
--

CREATE SEQUENCE demo_proj_2.table_diff_1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE demo_proj_2.table_diff_1_id_seq OWNER TO postgres;

--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 219
-- Name: table_diff_1_id_seq; Type: SEQUENCE OWNED BY; Schema: demo_proj_2; Owner: postgres
--

ALTER SEQUENCE demo_proj_2.table_diff_1_id_seq OWNED BY demo_proj_2.table_diff_1.id;


--
-- TOC entry 218 (class 1259 OID 233660)
-- Name: utilisateur; Type: TABLE; Schema: demo_proj_2; Owner: postgres
--

CREATE TABLE demo_proj_2.utilisateur (
    id integer NOT NULL,
    nom character varying(50),
    prenom character varying(50),
    mot_de_passe character varying(50)
);


ALTER TABLE demo_proj_2.utilisateur OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 233659)
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: demo_proj_2; Owner: postgres
--

CREATE SEQUENCE demo_proj_2.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE demo_proj_2.utilisateur_id_seq OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 217
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: demo_proj_2; Owner: postgres
--

ALTER SEQUENCE demo_proj_2.utilisateur_id_seq OWNED BY demo_proj_2.utilisateur.id;


--
-- TOC entry 216 (class 1259 OID 233635)
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    nom character varying(50),
    prenom character varying(50),
    mot_de_passe character varying(50)
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 233634)
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 215
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- TOC entry 3192 (class 2604 OID 233691)
-- Name: some_diff id; Type: DEFAULT; Schema: demo_proj_2; Owner: postgres
--

ALTER TABLE ONLY demo_proj_2.some_diff ALTER COLUMN id SET DEFAULT nextval('demo_proj_2.some_diff_id_seq'::regclass);


--
-- TOC entry 3191 (class 2604 OID 233670)
-- Name: table_diff_1 id; Type: DEFAULT; Schema: demo_proj_2; Owner: postgres
--

ALTER TABLE ONLY demo_proj_2.table_diff_1 ALTER COLUMN id SET DEFAULT nextval('demo_proj_2.table_diff_1_id_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 233663)
-- Name: utilisateur id; Type: DEFAULT; Schema: demo_proj_2; Owner: postgres
--

ALTER TABLE ONLY demo_proj_2.utilisateur ALTER COLUMN id SET DEFAULT nextval('demo_proj_2.utilisateur_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 233638)
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- TOC entry 3350 (class 0 OID 233688)
-- Dependencies: 222
-- Data for Name: some_diff; Type: TABLE DATA; Schema: demo_proj_2; Owner: postgres
--

INSERT INTO demo_proj_2.some_diff VALUES (1, 'Donnée 1', 10, '2023-01-01');
INSERT INTO demo_proj_2.some_diff VALUES (2, 'Donnée 2', 15, '2023-02-05');
INSERT INTO demo_proj_2.some_diff VALUES (3, 'Donnée 3', 20, '2023-03-10');
INSERT INTO demo_proj_2.some_diff VALUES (4, 'Donnée 4', 25, '2023-04-15');
INSERT INTO demo_proj_2.some_diff VALUES (5, 'Donnée 5', 30, '2023-05-20');
INSERT INTO demo_proj_2.some_diff VALUES (6, 'Donnée 6', 35, '2023-06-25');
INSERT INTO demo_proj_2.some_diff VALUES (7, 'Donnée 7', 40, '2023-07-30');
INSERT INTO demo_proj_2.some_diff VALUES (8, 'Donnée 8', 45, '2023-08-04');
INSERT INTO demo_proj_2.some_diff VALUES (9, 'Donnée 9', 50, '2023-09-09');
INSERT INTO demo_proj_2.some_diff VALUES (10, 'Donnée 10', 55, '2023-10-14');


--
-- TOC entry 3348 (class 0 OID 233667)
-- Dependencies: 220
-- Data for Name: table_diff_1; Type: TABLE DATA; Schema: demo_proj_2; Owner: postgres
--

INSERT INTO demo_proj_2.table_diff_1 VALUES (1, 'Doe', 'John', 30, '123 Rue des Lilas');
INSERT INTO demo_proj_2.table_diff_1 VALUES (2, 'Smith', 'Jane', 25, '456 Avenue des Roses');
INSERT INTO demo_proj_2.table_diff_1 VALUES (3, 'Johnson', 'Michael', 40, '789 Boulevard des Chênes');
INSERT INTO demo_proj_2.table_diff_1 VALUES (4, 'Williams', 'Emily', 35, '987 Rue du Soleil');
INSERT INTO demo_proj_2.table_diff_1 VALUES (5, 'Brown', 'Oliver', 28, '654 Avenue de la Lune');


--
-- TOC entry 3346 (class 0 OID 233660)
-- Dependencies: 218
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: demo_proj_2; Owner: postgres
--

INSERT INTO demo_proj_2.utilisateur VALUES (1, 'Rio', 'CLE', 'testtest');
INSERT INTO demo_proj_2.utilisateur VALUES (2, 'Cho', 'TAH', 'tesate');
INSERT INTO demo_proj_2.utilisateur VALUES (3, 'Coco', 'CHANNEL', 'chacha');
INSERT INTO demo_proj_2.utilisateur VALUES (4, 'Pomme', 'DAMOUR', 'choto');
INSERT INTO demo_proj_2.utilisateur VALUES (5, 'Rio', 'CLE', 'testtest');
INSERT INTO demo_proj_2.utilisateur VALUES (6, 'Cho', 'TAH', 'tesate');
INSERT INTO demo_proj_2.utilisateur VALUES (7, 'Coco', 'CHANNEL', 'chacha');
INSERT INTO demo_proj_2.utilisateur VALUES (8, 'Pomme', 'DAMOUR', 'choto');


--
-- TOC entry 3344 (class 0 OID 233635)
-- Dependencies: 216
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.utilisateur VALUES (1, 'Rio', 'CLE', 'testtest');
INSERT INTO public.utilisateur VALUES (2, 'Cho', 'TAH', 'tesate');
INSERT INTO public.utilisateur VALUES (3, 'Coco', 'CHANNEL', 'chacha');
INSERT INTO public.utilisateur VALUES (4, 'Pomme', 'DAMOUR', 'choto');


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 221
-- Name: some_diff_id_seq; Type: SEQUENCE SET; Schema: demo_proj_2; Owner: postgres
--

SELECT pg_catalog.setval('demo_proj_2.some_diff_id_seq', 10, true);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 219
-- Name: table_diff_1_id_seq; Type: SEQUENCE SET; Schema: demo_proj_2; Owner: postgres
--

SELECT pg_catalog.setval('demo_proj_2.table_diff_1_id_seq', 5, true);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 217
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: demo_proj_2; Owner: postgres
--

SELECT pg_catalog.setval('demo_proj_2.utilisateur_id_seq', 8, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 215
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 4, true);


--
-- TOC entry 3200 (class 2606 OID 233693)
-- Name: some_diff some_diff_pkey; Type: CONSTRAINT; Schema: demo_proj_2; Owner: postgres
--

ALTER TABLE ONLY demo_proj_2.some_diff
    ADD CONSTRAINT some_diff_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 233672)
-- Name: table_diff_1 table_diff_1_pkey; Type: CONSTRAINT; Schema: demo_proj_2; Owner: postgres
--

ALTER TABLE ONLY demo_proj_2.table_diff_1
    ADD CONSTRAINT table_diff_1_pkey PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 233665)
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: demo_proj_2; Owner: postgres
--

ALTER TABLE ONLY demo_proj_2.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


--
-- TOC entry 3194 (class 2606 OID 233640)
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


-- Completed on 2023-07-03 11:06:34

--
-- PostgreSQL database dump complete
--

