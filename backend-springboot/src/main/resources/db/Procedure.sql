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

CALL enable_printer(10);

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

CALL disable_printer(10);

CREATE PROCEDURE Change_location_printer(v_printer_id INT, v_campus VARCHAR, v_building VARCHAR, v_room VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET campus = v_campus, v_building = building, v_room = room
	WHERE printer_id = v_printer_id;
	RAISE NOTICE 'Location of printer was changed';
END;
$$;