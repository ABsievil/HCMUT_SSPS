
------------------5. Trang cài đặt hệ thống------------------
--5.1.Set default utility for every semester --  
CREATE  OR REPLACE PROCEDURE add_utility(p_semester VARCHAR, p_default_pages INT, p_date_reset_default DATE, p_page_price INT)
LANGUAGE plpgsql
as $$ 
begin 
	IF p_page_price > 2000 THEN
	Raise exception 'Page price cant exceed 2.000vnd'; 
	End IF;		
	INSERT INTO Utility(semester, default_pages, date_reset_default_page, page_price) 
	VALUES(p_semester, p_default_pages,p_date_reset_default, p_page_price);
	Raise notice 'Add utility success';
end; $$;
-- call add_utility('233',100,'2024-12-15',2500)

--5.2.Thêm máy in by (tất cả thuộc tính cần có của 1 máy in)--
CREATE PROCEDURE Add_printer (v_branch_name VARCHAR, v_printer_model VARCHAR, v_description VARCHAR, v_campus VARCHAR, v_building VARCHAR, v_room VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	INSERT INTO Printer (branch_name, printer_model, description, campus, building, room)
	values (v_branch_name, v_printer_model, v_description, v_campus, v_building, v_room);
	RAISE NOTICE 'Added printer success';
END;
$$;

--5.3.Update state với tham số truyền vào là bool state $\-- 
CREATE PROCEDURE Enable_printer(v_printer_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET state = TRUE
	WHERE printer_id = v_printer_id;
	RAISE NOTICE 'Printer was enabled';
END;
$$;
--CALL enable_printer(10);
CREATE PROCEDURE Disable_printer(v_printer_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET state = FALSE
	WHERE printer_id = v_printer_id;
	RAISE NOTICE 'Printer was disabled';
END;
$$;
-- CALL disable_printer(10);

--5.4.Update file accept với tham số là tên đuôi file--
CREATE OR REPLACE PROCEDURE delete_file_type(p_semester VARCHAR, p_type_accepted VARCHAR)
LANGUAGE plpgsql
AS $$ 
Begin 
	 Delete from File_types_accepted where semester = p_semester and type_accepted = p_type_accepted;  
	 Raise notice 'Update file type success';
End; $$; 
-- call delete_file_type('232','.pdf')
CREATE OR REPLACE PROCEDURE insert_file_type(p_semester VARCHAR, p_type_accepted VARCHAR)
LANGUAGE plpgsql
AS $$ 
Begin 
	INSERT INTO File_types_accepted VALUES (p_semester,p_type_accepted); 
	Raise notice 'Update file type success'; 
End;$$; 
-- call insert_file_type('232','.pdf')

--5.5.UPDATE ngày cung cấp định kỳ với tham số là ngày cung cấp$
CREATE OR REPLACE PROCEDURE update_date_reset (reset_semester VARCHAR, reset_date DATE ) 
LANGUAGE plpgsql 
AS $$
BEGIN 
	UPDATE UTILITY  
	SET date_reset_default_page = reset_date 
	WHERE semester = reset_semester;  
END;$$; 
--CALL update_date_reset('232', '2024-01-01'); 

--5.6.Update số tiền/trang cung cấp định kỳ với tham số là số tiền/trang cung cấp định kỳ
CREATE OR REPLACE PROCEDURE update_page_price (reset_semester VARCHAR, p_page_price INT ) 
LANGUAGE plpgsql 
AS $$
BEGIN 
	UPDATE UTILITY  
	SET page_price = p_page_price
	WHERE semester = reset_semester;  
END;$$; 
--CALL update_page_price('232', 1200); 

--5.7.update số trang cung cấp định kỳ với tham số là số trang cung cấp định kỳ$
CREATE OR REPLACE PROCEDURE update_default_page (reset_semester VARCHAR, p_default_page int ) 
LANGUAGE plpgsql 
AS $$
BEGIN 
	UPDATE UTILITY  
	SET default_pages = p_default_page
	WHERE semester = reset_semester;  
END;$$; 
--CALL  update_default_page('232', 50); 