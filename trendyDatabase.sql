--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: 303; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "303" WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect "303"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: plpgsql_call_handler(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION plpgsql_call_handler() RETURNS language_handler
    LANGUAGE c
    AS '$libdir/plpgsql', 'plpgsql_call_handler';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: stock; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE stock (
    sid integer NOT NULL,
    uid integer,
    label character varying(100),
    price numeric(10,4),
    quantity integer
);


--
-- Name: stock_sid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE stock_sid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stock_sid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE stock_sid_seq OWNED BY stock.sid;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE transactions (
    tid integer NOT NULL,
    sid integer,
    uid integer,
    type character varying(10)
);


--
-- Name: transactions_tid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE transactions_tid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_tid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE transactions_tid_seq OWNED BY transactions.tid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    uid integer NOT NULL,
    username character varying(50),
    realname character varying(100),
    password character varying(50)
);


--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_uid_seq OWNED BY users.uid;


--
-- Name: sid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY stock ALTER COLUMN sid SET DEFAULT nextval('stock_sid_seq'::regclass);


--
-- Name: tid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY transactions ALTER COLUMN tid SET DEFAULT nextval('transactions_tid_seq'::regclass);


--
-- Name: uid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN uid SET DEFAULT nextval('users_uid_seq'::regclass);


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY stock (sid, uid, label, price, quantity) FROM stdin;
1	1	Camera	12.9000	3
2	1	Hat	30.0000	1
3	2	Bald Eagle	999.9900	10
4	2	Kiwi	49999.9900	3
5	3	Snakes and Ladders	1.0000	1
6	3	Monopoly	3.0000	1
7	4	Holy Grail	0.9900	1
8	5	Meaning of Life	42.0000	20
9	5	Cactus	9.9900	3
10	5	Iris	9.9900	15
11	6	Knives	15.5000	4
12	6	Sword	49.9700	8
13	7	Kryptonite	0.5000	100
14	7	S Clothing Patch	5.9900	1000
15	8	Table	10.0000	1
16	9	Small Chair	5.0000	1
17	10	Coffee	4.9900	10
18	10	Muffin	3.5000	10
\.


--
-- Name: stock_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('stock_sid_seq', 18, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY transactions (tid, sid, uid, type) FROM stdin;
1	3	1	PURCHASE
2	1	10	PURCHASE
3	4	3	PURCHASE
4	5	4	PURCHASE
5	14	1	PURCHASE
6	14	10	PURCHASE
7	14	8	PURCHASE
8	18	7	PURCHASE
9	17	7	PURCHASE
10	18	11	PURCHASE
11	11	11	PURCHASE
12	11	11	PURCHASE
13	11	11	PURCHASE
14	11	11	PURCHASE
15	9	11	PURCHASE
16	3	11	PURCHASE
17	17	11	PURCHASE
18	13	11	PURCHASE
\.


--
-- Name: transactions_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('transactions_tid_seq', 18, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (uid, username, realname, password) FROM stdin;
1	admin	Sally Smith	1337
2	j0nny	John Diggle	password
3	james	James Green	green
4	zoo	Monty Python	dinosaur
5	qwerty	Zoe Curtis	purple
6	Cambel	Thea Queen	something
7	Waities	Kara Danvers	secure
8	Cam	Camile Jones	12345
9	grod	Cameron Smith	dfgh
10	flash	Barry Allen	falsh
11	arrow	Oliver Queen	arrow
\.


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_uid_seq', 11, true);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM pgsql;
GRANT ALL ON SCHEMA public TO pgsql;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

