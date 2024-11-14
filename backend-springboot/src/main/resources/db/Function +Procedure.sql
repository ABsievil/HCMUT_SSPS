--------------------------------------------------------------PRINTER-----------------------------------------------------------

--Thêm/Bật/Tắt và Sửa thông tin của Printer
--10. add_printer(brand_name VARCHAR, printer_model VARCHAR, description VARCHAR, campus VARCHAR, building VARCHAR, room VARCHAR)
CREATE OR REPLACE PROCEDURE add_printer(brand_name VARCHAR, printer_model VARCHAR, description VARCHAR, campus VARCHAR, building VARCHAR, room VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	INSERT INTO Printer (brand_name, printer_model, description, campus, building, room)
	values (brand_name, printer_model, description, campus, building, room);
	RAISE NOTICE 'Add printer succeed';
END;
$$;
call add_printer('HP', 'OfficeJet Pro 9025e', 'May in phun, may in laser, may in da chuc nang (in, scan, copy, fax)', '02', 'H1', '106')
 
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
call Enable_printer('10'); 
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
-- CALL disable_printer(10);
--13. update_printer_infor(printer_id_input INT, brand_name_input VARCHAR, printer_model_input VARCHAR, description_input VARCHAR, campus_input VARCHAR, building_input VARCHAR, room_input VARCHAR)
CREATE OR REPLACE PROCEDURE update_printer_infor(printer_id_input INT, brand_name_input VARCHAR, printer_model_input VARCHAR, description_input VARCHAR, campus_input VARCHAR, building_input VARCHAR, room_input VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET printer_id = printer_id_input, brand_name = brand_name_input, printer_model = printer_model_input, description = description_input, campus = campus_input, building = building_input, room =  room_input;
	RAISE NOTICE 'Printer was disabled';
END;
$$;
--call update_printer()
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
-- select * from get_printer_infor_by_id('1')
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
-- select * from get_infor_all_printer()