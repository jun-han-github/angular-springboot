INSERT INTO employee.admin (id, email, password, admin_role, locked, enabled) VALUES
(1, 'junhan@admin.com', '$2a$12$IqByppyLNnK4N2pxShy9rOj3.5TXt2YlzXjPuzGDTmNT.nbGYm1E.', 'ADMIN', 0,1),
(2, 'example@admin.com', '$2a$12$IqByppyLNnK4N2pxShy9rOj3.5TXt2YlzXjPuzGDTmNT.nbGYm1E.', 'ADMIN', 0,1),
(3, 'example@user.com', '$2a$12$IqByppyLNnK4N2pxShy9rOj3.5TXt2YlzXjPuzGDTmNT.nbGYm1E.', 'USER', 0,0);

UPDATE employee.admin_sequence SET next_val = 4 WHERE next_val = 1;