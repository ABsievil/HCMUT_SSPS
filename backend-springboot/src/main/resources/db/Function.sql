-------------STUDENT CHOOSE PRINTER TO PRINT-------------
CREATE FUNCTION Printer_information()
RETURNS TABLE (
	printer_id INT,
	brand_name VARCHAR,
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

-- SELECT printer_id, brand_name, printer_model, description, campus, building, room, state FROM Printer_information(); 

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

-- SELECT *  FROM Log_a_student('2213995')

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

-- SELECT * FROM Log_all_student()

------------------
-- Function returns accepted file for selected semester-- 
-- Support for print page
CREATE OR REPLACE FUNCTION  file_of_semester(f_semester VARCHAR) 
RETURNS TABLE (Accepted_file_types VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN 
	Return query
	Select type_accepted from File_types_accepted where semester = f_semester; 
END; $$; 
--JSON -- 
CREATE OR REPLACE FUNCTION file_of_semester_json(f_semester VARCHAR) 
RETURNS JSON 
LANGUAGE plpgsql
AS $$ 
	declare result JSON;
BEGIN 
	SELECT json_agg(type_accepted)
	INTO result
	FROM File_types_accepted
	WHERE semester = f_semester; 

	RETURN result; 
END; $$; 

-- select * from file_of_semester_json('232'); 
-- select * from file_of_semester('232'); 
------------------









