CREATE TABLE public.healthcheck (
                                    id serial NOT NULL,
                                    message varchar NULL
);

INSERT INTO public.healthcheck ("message")
VALUES ('I''m fine. Thank you.');

CREATE TABLE public."user" (
                               id serial NOT NULL,
                               username varchar NULL,
                               "password" varchar NULL,
                               email varchar NULL,
                               firstname varchar NULL,
                               lastname varchar NULL,
                               phone varchar NULL,
                               address varchar NULL,
                               CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.category (
                                 id serial4 NOT NULL,
                                 "name" varchar NULL,
                                 CONSTRAINT category_pk PRIMARY KEY (id)
);
CREATE TABLE public.product (
                                id serial4 NOT NULL,
                                "name" varchar NULL,
                                price int4 NULL,
                                category int4 NULL,
                                stock int4 NULL,
                                image_url varchar NULL,
                                recommend bool NULL,
                                create_date timestamp NULL,
                                CONSTRAINT product_pk PRIMARY KEY (id),
                                CONSTRAINT product_fk FOREIGN KEY (category) REFERENCES public.category(id)
);
INSERT INTO public.category (id, "name") VALUES(1, 'ทั้งหมด');
INSERT INTO public.category (id, "name") VALUES(2, 'ชุดเช็ต');
INSERT INTO public.category (id, "name") VALUES(3, 'เนื้อหมู');
INSERT INTO public.category (id, "name") VALUES(4, 'เนื้อวัว');
INSERT INTO public.category (id, "name") VALUES(5, 'ทะเล');
INSERT INTO public.category (id, "name") VALUES(6, 'เส้น');
INSERT INTO public.category (id, "name") VALUES(7, 'ผัก');
INSERT INTO public.category (id, "name") VALUES(8, 'อาหารทานเล่น');