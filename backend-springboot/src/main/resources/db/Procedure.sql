-------------PRINTER-------------
CREATE PROCEDURE Add_printer (v_branch_name VARCHAR, v_printer_model VARCHAR, v_description VARCHAR, v_campus VARCHAR, v_building VARCHAR, v_room VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	INSERT INTO Printer (branch_name, printer_model, description, campus, building, room)
	values (v_branch_name, v_printer_model, v_description, v_campus, v_building, v_room);
	RAISE NOTICE 'Added printer success';
END;
$$;

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

-- CALL enable_printer(10);

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

-- Set default utility for every semester --  
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

call add_utility('233',100,'2024-12-15',2500)

---------- --------------
-- Edit default file type -- 
CREATE OR REPLACE PROCEDURE delete_file_type(p_semester VARCHAR, p_type_accepted VARCHAR)
LANGUAGE plpgsql
AS $$ 
Begin 
	 Delete from File_types_accepted where semester = p_semester and type_accepted = p_type_accepted;  
	 Raise notice 'Update file type success';
End; $$; 

call delete_file_type('232','.pdf')

CREATE OR REPLACE PROCEDURE insert_file_type(p_semester VARCHAR, p_type_accepted VARCHAR)
LANGUAGE plpgsql
AS $$ 
Begin 
	INSERT INTO File_types_accepted VALUES (p_semester,p_type_accepted); 
	Raise notice 'Update file type success'; 
End;$$; 

call insert_file_type('232','.pdf')

------------------