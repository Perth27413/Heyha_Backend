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
CREATE TABLE public.status (
                               id serial4 NOT NULL,
                               "name" varchar NULL,
                               CONSTRAINT status_pk PRIMARY KEY (id)
);
CREATE TABLE public.cart (
                             id serial4 NOT NULL,
                             user_id int4 NULL,
                             product_id int4 NULL,
                             product_quantity int4 NULL,
                             created_at timestamp NULL,
                             updated_at timestamp NULL,
                             CONSTRAINT cart_pk PRIMARY KEY (id),
                             CONSTRAINT cart_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
                             CONSTRAINT cart_fk_1 FOREIGN KEY (product_id) REFERENCES public.product(id)
);
CREATE TABLE public.payment (
                                id serial4 NOT NULL,
                                "method" varchar NULL,
                                CONSTRAINT payment_pk PRIMARY KEY (id)
);
CREATE TABLE public."order" (
                                id serial4 NOT NULL,
                                user_id int NULL,
                                total int NULL,
                                payment_id int NULL,
                                status_id int NULL,
                                created_at timestamp NULL,
                                updated_at timestamp NULL,
                                CONSTRAINT order_pk PRIMARY KEY (id),
                                CONSTRAINT order_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
                                CONSTRAINT order_fk_1 FOREIGN KEY (status_id) REFERENCES public.status(id),
                                CONSTRAINT order_fk_2 FOREIGN KEY (payment_id) REFERENCES public.payment(id)
);
