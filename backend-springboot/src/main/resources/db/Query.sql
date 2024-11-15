---------------------------------------------------------------ADMIN----------------------------------------------------------
--1--Lấy thông tin của admin
CREATE OR REPLACE FUNCTION get_admin_infor()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
			'last_name', u.last_name,
			'middle_name', u.middle_name,
			'first_name', u.first_name,
			'email', u.email,
			'date_of_birth', u.date_of_birth,
			'role', u.role,
			'phone_number', u.phone_number
       		)
    INTO result
    FROM Users u
	WHERE u.role = 'ADMIN';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_admin_infor()

---------------------------------------------------------------STUDENT-----------------------------------------------------------
--2--Lấy thông tin của student bằng mã số sinh viên
CREATE OR REPLACE FUNCTION get_student_infor_by_id(student_id_input VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
			'last_name', u.last_name,
			'middle_name', u.middle_name,
			'first_name', u.first_name,
			'email', u.email,
			'date_of_birth', u.date_of_birth,
			'role', u.role,
			'phone_number', u.phone_number,
			'student_id', u.student_id,
			'school_year', u.school_year,
			'faculty', u.faculty,
			'page_remain', u.page_remain
       		)
    INTO result
    FROM Users u
	WHERE u.student_id = student_id_input;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_student_infor_by_id('2211337')

--3--Lấy thông tin toàn bộ sinh viên trong hệ thống
CREATE OR REPLACE FUNCTION get_all_student_infor()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(
	   		json_build_object(
			'last_name', u.last_name,
			'middle_name', u.middle_name,
			'first_name', u.first_name,
			'email', u.email,
			'date_of_birth', u.date_of_birth,
			'role', u.role,
			'phone_number', u.phone_number,
			'student_id', u.student_id,
			'school_year', u.school_year,
			'faculty', u.faculty,
			'page_remain', u.page_remain
       			)
			)
    INTO result
    FROM Users u
	WHERE u.role = 'USER';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_all_student_infor()

--4--Thêm một sinh viên = tạo tài khoản mới cho sinh viên
CREATE OR REPLACE PROCEDURE add_student(
	username_input VARCHAR, 
	password_input VARCHAR, 
	last_name_input VARCHAR, 
	middle_name_input VARCHAR, 
	first_name_input VARCHAR, 
	email_input VARCHAR, 
	date_of_birth_input DATE, 
	phone_number_input VARCHAR, 
	role_input VARCHAR,
	student_id_input VARCHAR, 
	school_year_input VARCHAR, 
	faculty_input VARCHAR, 
	page_remain_input INT
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO Users (username, password, last_name, middle_name, first_name, email, date_of_birth, phone_number, role, 
                        student_id, school_year, faculty, page_remain)
    VALUES (
                username_input, 
                password_input, 
                last_name_input, 
                middle_name_input, 
                first_name_input, 
                email_input, 
                date_of_birth_input, 
                phone_number_input, 
                role_input, 
                student_id_input, 
			    school_year_input, 
                faculty_input, 
                page_remain_input
            );
END;
$$;

-- CALL add_student('quachgiaphu', '$2a$10$TzDeitFt5kFI6nQgLPqJfelouc08AWJAr4tQZyr96X6nal7pw4oBi', 'Quach', 'Gia', 'Phu', 'quachgiaphu@gmail.com',
--  				'2004-9-17', '0976251672', 'USER', '2213662', '2', 'Computer Science', 100)

--5--Xóa sinh viên ra khỏi hệ thống
CREATE OR REPLACE PROCEDURE delete_student(student_id_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM Users
	WHERE student_id = student_id_input;
END;
$$;

-- CALL delete_student('2213662')

--6--Cập nhật thông tin sinh viên
--Check các thuộc tính nếu null thì không đổi thông tin
CREATE OR REPLACE PROCEDURE update_student_infor(
	student_id_input VARCHAR, 
	last_name_input VARCHAR, 
	middle_name_input VARCHAR, 
	first_name_input VARCHAR, 
	email_input VARCHAR, 
	date_of_birth_input DATE, 
	phone_number_input VARCHAR, 
	school_year_input VARCHAR, 
	faculty_input VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Users
	SET 
	    last_name = last_name_input,
		middle_name = middle_name_input,
		first_name = first_name_input,
		email = email_input,
		date_of_birth = date_of_birth_input,
		phone_number = phone_number_input,
		school_year = school_year_input,
		faculty = faculty_input
	WHERE student_id = student_id_input;
END;
$$;

-- CALL update_student_infor('quachgiaphu', 'Quach', 'Gia', 'Phu', 'quachgiaphu@gmail.com', '2004-9-17', '0976251672', '3', 'Electric')

--7--Đổi mật khẩu của sinh viên
CREATE OR REPLACE PROCEDURE change_password(username_input VARCHAR, new_password_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
	UPDATE Users
	SET password = new_password_input
	WHERE username = username_input;
END;
$$;

-- CALL change_password('quachgiaphu', '4321')

--8--Lấy số trang còn lại của học sinh
CREATE OR REPLACE FUNCTION get_number_page_default_remain(student_id_input VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
			'page_remain', u.page_remain
       		)
    INTO result
    FROM Users u
	WHERE u.student_id = student_id_input;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_number_page_default_remain('2213995')

--9--Lấy tổng số trang đã in của sinh viên
CREATE OR REPLACE FUNCTION get_number_page_was_printed(username_input VARCHAR)
RETURNS JSON AS $$
DECLARE
	number_page_was_printed INT;
BEGIN
	SELECT SUM(number_pages_of_file * number_copy) INTO number_page_was_printed
	FROM Printed_turn
	WHERE username = username_input;
	
	RETURN json_build_object('number_page_was_printed', number_page_was_printed);
END;
$$ LANGUAGE plpgsql;

-- SELECT get_number_page_was_printed('nguyenmanhhung')

--10--

--11--

---------------------------------------------------------------PRINTER-----------------------------------------------------------

--12--Thêm máy in
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

--13--Bật máy in
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

--14--Tắt máy in
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

--15--Cập nhật thông tin máy in
--Check null các thuộc tính nếu null thì không cần đổi thông tin
CREATE OR REPLACE PROCEDURE update_printer_infor(printer_id_input INT, brand_name_input VARCHAR, printer_model_input VARCHAR, description_input VARCHAR, campus_input VARCHAR, building_input VARCHAR, room_input VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
	UPDATE Printer 
	SET 
		brand_name = brand_name_input, 
		printer_model = printer_model_input, 
		description = description_input, 
		campus = campus_input, 
		building = building_input, 
		room =  room_input
	WHERE printer_id = printer_id_input;
END;
$$;

-- CALL update_printer()

--16--Lấy thông tin máy in bằng id
CREATE OR REPLACE FUNCTION get_printer_infor_by_id(printer_id_input INT)
RETURNS JSON 
LANGUAGE PLPGSQL 
AS $$ 
	DECLARE result json; 
BEGIN 
 	SELECT row_to_json(p)
	INTO result 
	FROM printer P 
	WHERE printer_id = printer_id_input; 
	RETURN result; 
END; $$; 

-- SELECT * from get_printer_infor_by_id('1')

--17--lấy thông tin của toàn bộ máy in
CREATE OR REPLACE FUNCTION get_infor_all_printer()
RETURNS JSON 
LANGUAGE PLPGSQL 
AS $$ 
	DECLARE result json; 
BEGIN 
 	SELECT json_agg(row_to_json(p))
	INTO result 
	FROM printer p;
	RETURN result; 
END; $$; 

-- SELECT * from get_infor_all_printer()

----------------------------------------------------------------PRINT------------------------------------------------------------

--18--Nhấn nút in
CREATE OR REPLACE PROCEDURE print(
	username_input VARCHAR, 
	printer_id_input INT, 
	printing_date_input DATE, 
	time_start_input TIME, 
	time_end_input TIME, 
	file_name_input VARCHAR, 
	file_type_input VARCHAR, 
	number_page_of_file_input INT, 
	page_size_input VARCHAR, 
	number_size_input INT, 
	number_copy_input INT
)
LANGUAGE PLPGSQL 
AS $$ 
	declare page INT;
BEGIN 
	SELECT page_remain INTO page FROM users WHERE username = username_input; 
	INSERT INTO printed_turn (username, printer_id , printing_date , time_start , time_end , file_name, file_type , number_pages_of_file, page_size , number_side, number_copy ) VALUES (username_input , printer_id_input, printing_date_input , time_start_input , time_end_input, file_name_input , file_type_input , number_page_of_file_input , page_size_input, number_size_input , number_copy_input );
	UPDATE users 
	SET page_remain = page - (number_page_of_file_input * number_copy_input);
END; $$; 

--SELECT page_remain from users where username = 'matruongvu'
--CALL print('matruongvu', 1, '2024-05-15', '09:28:11', '09:30:01', 'bao cao bai tap lon he co so du lieu', '.pdf', 2, 'A4', 2, 2)

----------------------------------------------------------------BUY PAPER--------------------------------------------------------

--19--

----------------------------------------------------------------ULTILITY--------------------------------------------------------

--20--Thêm loại file in được
CREATE OR REPLACE PROCEDURE add_file_accepted(semester_input VARCHAR, type_accepted_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO File_types_accepted (semester, type_accepted)
    VALUES (semester_input, type_accepted_input);
END;
$$;

-- CALL add_file_accepted('251', '.bin')

--21--Xóa loại file in được
CREATE OR REPLACE PROCEDURE delete_file_accepted(semester_input VARCHAR, type_accepted_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM File_types_accepted
	WHERE semester = semester_input AND  type_accepted = type_accepted_input;
END;
$$;

-- CALL delete_file_accepted('251', '.bin')

--22--Thêm các thông số của học kì
CREATE OR REPLACE PROCEDURE add_utility_of_semester(semester_input VARCHAR, default_pages_input INT, date_reset_default_page_input DATE, page_price_input INT)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO Utility (semester, default_pages, date_reset_default_page, page_price)
    VALUES (semester_input, default_pages_input, date_reset_default_page_input, page_price_input);
END;
$$;

-- CALL add_utility_of_semester('261', 100, '2024-12-12', 2000)

--23--Cập nhật các thông số của học kì
CREATE OR REPLACE PROCEDURE update_utility_of_semester(semester_input VARCHAR, page_price_input INT)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Utility
	SET 
	    page_price = page_price_input
	WHERE semester = semester_input;
END;
$$;

-- CALL update_utility_of_semester('252', 2000)

--24--

--25--
