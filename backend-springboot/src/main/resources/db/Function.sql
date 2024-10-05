-------------STUDENT CHOOSE PRINTER TO PRINT-------------

CREATE FUNCTION Printer_information()
RETURNS TABLE (
	printer_id INT,
	branch_name VARCHAR,
	printer_model VARCHAR,
	description VARCHAR,
	campus VARCHAR,
	building VARCHAR,
	room VARCHAR,
	state BOOLEAN
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT * FROM Printer WHERE Printer.state = true;
END;
$$;

SELECT printer_id, branch_name, campus, building, room FROM Printer_information();

-------------NUMBER PAGE NEED TO BUY-------------

CREATE FUNCTION Check_page_main (v_username VARCHAR, number_page_printing INT, page_size VARCHAR)  
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE 
    user_page INT := 0; -- số trang còn lại của user
    printing_page INT := 0; -- số trang cần in
    purchase_page INT := 0; -- số trang cần mua
BEGIN
    -- quy đổi số trang cần in = number_page_printing * type (A1 = 8, A2 = 4, A3 = 2, A4 = 1, A5 = 0.5)
    IF page_size = 'A1' THEN
        printing_page := number_page_printing * 8;
    ELSIF page_size = 'A2' THEN
        printing_page := number_page_printing * 4;
    ELSIF page_size = 'A3' THEN
        printing_page := number_page_printing * 2;
    ELSIF page_size = 'A4' THEN
        printing_page := number_page_printing * 1; -- Thêm điều kiện cho A4
    ELSIF page_size = 'A5' THEN
        printing_page := number_page_printing * 0.5;
    ELSE
        RAISE EXCEPTION 'Invalid page size: %', page_size; -- Xử lý trường hợp không hợp lệ
    END IF;

    -- lấy số trang còn lại của user
    SELECT page_remain INTO user_page
    FROM users 
    WHERE username = v_username;

    IF user_page IS NULL THEN
        RAISE EXCEPTION 'User not found: %', v_username; -- Kiểm tra nếu người dùng không tồn tại
    END IF;

    IF printing_page < user_page THEN
        purchase_page := 0;
        UPDATE users 
        SET page_remain = user_page - printing_page
        WHERE username = v_username;
    ELSIF printing_page = user_page THEN
        purchase_page := 0;
        UPDATE users 
        SET page_remain = 0
        WHERE username = v_username;
    ELSE
        purchase_page := printing_page - user_page;
        UPDATE users 
        SET page_remain = 0
        WHERE username = v_username;
        RAISE NOTICE 'You must buy % page', purchase_page;
    END IF;

    RETURN purchase_page;
END;
$$;

-------------LOG OF PRINTING-------------

CREATE FUNCTION Log_a_student (v_student_id VARCHAR)  
RETURNS TABLE (
	r_student_id VARCHAR,
	r_printer_id INT,
	r_file_name VARCHAR,
	r_time_start TIME,
	r_time_end TIME,
	r_page_size VARCHAR,
	r_total_pages INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT Users.student_id, printer_id, file_name, time_start, time_end, page_size, (number_pages_of_file * number_copy / NULLIF(number_side, 0)) AS total_pages
	FROM Users, Printed_turn
	WHERE Users.student_id = v_student_id and Users.username = Printed_turn.username;
END;
$$;

CREATE FUNCTION Log_all_student ()  
RETURNS TABLE (
	r_student_id VARCHAR,
	r_printer_id INT,
	r_file_name VARCHAR,
	r_time_start TIME,
	r_time_end TIME,
	r_page_size VARCHAR,
	r_total_pages INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT Users.student_id, printer_id, file_name, time_start, time_end, page_size, (number_pages_of_file * number_copy / NULLIF(number_side, 0)) AS total_pages
	FROM Users, Printed_turn
	WHERE Users.username = Printed_turn.username;
END;
$$;

CREATE FUNCTION Log_period_a_student (v_student_id VARCHAR, v_time_start TIME, v_time_end TIME)  
RETURNS TABLE (
	r_student_id VARCHAR,
	r_printer_id INT,
	r_file_name VARCHAR,
	r_time_start TIME,
	r_time_end TIME,
	r_page_size VARCHAR,
	r_total_pages INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT Users.student_id, printer_id, file_name, time_start, time_end, page_size, (number_pages_of_file * number_copy / NULLIF(number_side, 0)) AS total_pages
	FROM Users, Printed_turn
	WHERE Users.student_id = v_student_id AND Users.username = Printed_turn.username AND time_start > v_time_start AND time_end < v_time_end;
END;
$$;

CREATE FUNCTION Log_period_all_student (v_time_start TIME, v_time_end TIME)  
RETURNS TABLE (
	r_student_id VARCHAR,
	r_printer_id INT,
	r_file_name VARCHAR,
	r_time_start TIME,
	r_time_end TIME,
	r_page_size VARCHAR,
	r_total_pages INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT Users.student_id, printer_id, file_name, time_start, time_end, page_size, (number_pages_of_file * number_copy / NULLIF(number_side, 0)) AS total_pages
	FROM Users, Printed_turn
	WHERE Users.username = Printed_turn.username AND time_start > v_time_start AND time_end < v_time_end;
END;
$$;

------------------
-- Function returns accepted file for selected semester-- 
CREATE OR REPLACE FUNCTION  file_of_semester(f_semester VARCHAR) 
RETURNS TABLE (Accepted_file_types VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN 
	Return query
	Select type_accepted from File_types_accepted where semester = f_semester; 
END; $$; 

select * from file_of_semester('232'); 
------------------









