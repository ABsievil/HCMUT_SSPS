--------------------------------------------------------------PRINTER-----------------------------------------------------------

--Thêm/Bật/Tắt và Sửa thông tin của Printer
--10. add_printer(brand_name VARCHAR, printer_model VARCHAR, description VARCHAR, campus VARCHAR, building VARCHAR, room VARCHAR)
CREATE OR REPLACE PROCEDURE add_printer(
	brand_name VARCHAR, 
	printer_model VARCHAR, 
	description VARCHAR, 
	campus VARCHAR, 
	building VARCHAR, 
	room VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
	INSERT INTO Printer (brand_name, printer_model, description, campus, building, room)
	values (brand_name, printer_model, description, campus, building, room);
	RAISE NOTICE 'Add printer success';
END;
$$;
-- CALL add_printer('HP', 'OfficeJet Pro 9025e', 'May in phun, may in laser, may in da chuc nang (in, scan, copy, fax)', '02', 'H1', '106')

--11. enable_printer(printer_id_input INT)
CREATE PROCEDURE Enable_printer(printer_id_input INT)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET state = TRUE
	WHERE printer_id = printer_id_input;
	RAISE NOTICE 'Printer was enabled';
END;
$$;
-- CALL Enable_printer('10')

--12. disable_printer(printer_id_input INT)
CREATE PROCEDURE Disable_printer(printer_id_input INT)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET state = FALSE
	WHERE printer_id = printer_id_input;
	RAISE NOTICE 'Printer was disabled';
END;
$$;
-- CALL disable_printer(10)

--13. update_printer_infor(printer_id_input INT, brand_name_input VARCHAR, printer_model_input VARCHAR, description_input VARCHAR, campus_input VARCHAR, building_input VARCHAR, room_input VARCHAR)
CREATE OR REPLACE PROCEDURE update_printer_infor(printer_id_input INT, brand_name_input VARCHAR, printer_model_input VARCHAR, description_input VARCHAR, campus_input VARCHAR, building_input VARCHAR, room_input VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET 
		printer_id = printer_id_input,
		brand_name = brand_name_input, 
		printer_model = printer_model_input, 
		description = description_input, 
		campus = campus_input, 
		building = building_input, 
		room =  room_input;
END;
$$;
-- CALL update_printer()

--14. get_printer_infor_by_id(printer_id_input INT)
--> lấy thông tin của 1 Printer bằng id
CREATE OR REPLACE FUNCTION get_printer_infor_by_id(printer_id_input INT)
RETURNS JSON 
LANGUAGE PLPGSQL 
AS $$ 
	DECLARE result json; 
BEGIN 
 	SELECT 	row_to_json(p)
	INTO result 
	FROM printer P 
	WHERE printer_id = printer_id_input; 
	RETURN result; 
END; $$; 
-- SELECT * from get_printer_infor_by_id('1')

--15. get_infor_all_printer()
--> lấy thông tin toàn bộ Printer
CREATE OR REPLACE FUNCTION get_infor_all_printer()
RETURNS JSON 
LANGUAGE PLPGSQL 
AS $$ 
	DECLARE result json; 
BEGIN 
 	SELECT 	json_agg(row_to_json(p))
	INTO result 
	FROM printer p;
	RETURN result; 
END; $$; 
-- SELECT * from get_infor_all_printer()
----------------------------------------------------------------PRINT------------------------------------------------------------

--16. print(username_input VARCHAR, printer_id_input INT, printing_date_input DATE, time_start_input TIME, time_end_input TIME, file_name_input VARCHAR, file_type_input VARCHAR, number_page_of_file_input INT, page_size_input VARCHAR, number_size_input VARCHAR, number_copy_input VARCHAR)
CREATE OR REPLACE PROCEDURE print(username_input VARCHAR, printer_id_input INT, printing_date_input DATE, time_start_input TIME, time_end_input TIME, file_name_input VARCHAR, file_type_input VARCHAR, number_page_of_file_input INT, page_size_input VARCHAR, number_size_input INT, number_copy_input INT)
LANGUAGE PLPGSQL 
AS $$ 
	declare page INT;
BEGIN 
	SELECT page_remain INTO page FROM users WHERE username = username_input; 
	INSERT INTO printed_turn (username, printer_id , printing_date , time_start , time_end , file_name, file_type , number_pages_of_file, page_size , number_side, number_copy ) VALUES (username_input , printer_id_input, printing_date_input , time_start_input , time_end_input, file_name_input , file_type_input , number_page_of_file_input , page_size_input, number_size_input , number_copy_input );
	UPDATE users 
	SET page_remain = page - (number_page_of_file_input * number_copy_input);
END; $$; 
--select page_remain from users where username = 'matruongvu'
--call print('matruongvu', 1, '2024-05-15', '09:28:11', '09:30:01', 'bao cao bai tap lon he co so du lieu', '.pdf', 2, 'A4', 2, 2)