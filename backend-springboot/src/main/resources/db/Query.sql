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
--2.1--
CREATE OR REPLACE FUNCTION get_student_id_by_username(username_input VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
    result VARCHAR;
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Users WHERE username = username_input
    )
    THEN 
        RAISE EXCEPTION 'Username % does not exist', username_input;
    END IF;

    SELECT student_id 
    INTO result
    FROM Users 
    WHERE username = username_input;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_student_id_by_username('cuong.nguyen317qb')

--2.2--Lấy thông tin của student bằng mã số sinh viên
CREATE OR REPLACE FUNCTION get_student_infor_by_id(student_id_input VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
	IF NOT EXISTS (
		SELECT * FROM Users WHERE student_id = student_id_input
	)
	THEN 
	 	RAISE EXCEPTION 'Student_id % does not exist', student_id_input;
	END IF;
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

--2.3--Lấy thông tin của student bằng mã số sinh viên
CREATE OR REPLACE FUNCTION get_student_infor_by_username(username_input VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
	IF NOT EXISTS (
		SELECT * FROM Users WHERE username = username_input
	)
	THEN 
	 	RAISE EXCEPTION 'Username % does not exist', username_input;
	END IF;
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
	WHERE u.username = username_input;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- select get_student_infor_by_username('vu.makhmtk22')

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

--5--Xóa sinh viên ra khỏi hệ thống bằng mã số sinh viên
CREATE OR REPLACE PROCEDURE delete_student(student_id_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
	IF NOT EXISTS (
		SELECT * FROM Users WHERE student_id = student_id_input
	)
	THEN 
	 	RAISE EXCEPTION 'Student_id % does not exist', student_id_input;
	END IF;
    DELETE FROM Users
	WHERE student_id = student_id_input;
END;
$$;

-- CALL delete_student('2213662')

--6--Cập nhật thông tin sinh viên
--Check các thuộc tính nếu null thì không đổi thông tin, xác định sinh viên bằng mã số sinh viên
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
	IF NOT EXISTS (
		SELECT * FROM Users WHERE student_id = student_id_input
	)
	THEN 
	 	RAISE EXCEPTION 'Student_id % does not exist', student_id_input;
	END IF;
    UPDATE Users
	SET 
	    last_name = COALESCE(last_name_input, last_name),
        middle_name = COALESCE(middle_name_input, middle_name),
        first_name = COALESCE(first_name_input, first_name),
        email = COALESCE(email_input, email),
        date_of_birth = COALESCE(date_of_birth_input, date_of_birth),
        phone_number = COALESCE(phone_number_input, phone_number),
        school_year = COALESCE(school_year_input, school_year),
        faculty = COALESCE(faculty_input, faculty)
	WHERE student_id = student_id_input;
END;
$$;

-- CALL update_student_infor('quachgiaphu', 'Quach', 'Gia', 'Phu', 'quachgiaphu@gmail.com', '2004-9-17', '0976251672', '3', 'Electric')

--6.1-- cập nhật số trang còn lại của student
CREATE OR REPLACE PROCEDURE update_student_page_remain(
	student_id_input VARCHAR, 
	page_remain_input INT
)
LANGUAGE plpgsql AS $$
BEGIN
	IF NOT EXISTS (
		SELECT * FROM Users WHERE student_id = student_id_input
	)
	THEN 
	 	RAISE EXCEPTION 'Student_id % does not exist', student_id_input;
	END IF;
    UPDATE Users
	SET 
        page_remain = COALESCE(page_remain_input, page_remain)
	WHERE student_id = student_id_input;
END;
$$;

-- CALL update_student_page_remain('2213995', 20)

--7.1--Đổi mật khẩu của sinh viên, lưu mật khẩu mới
CREATE OR REPLACE PROCEDURE change_password(username_input VARCHAR, new_password_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
	IF NOT EXISTS (
		SELECT * FROM Users WHERE username = username_input
	)
	THEN 
	 	RAISE EXCEPTION 'Username % does not exist', username_input;
	END IF;
	UPDATE Users
	SET password = new_password_input
	WHERE username = username_input;
END;
$$;

-- 7.2 get_password_by_username(username_input VARCHAR)
CREATE OR REPLACE FUNCTION get_password_by_username(username_input VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
    result VARCHAR;
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Users WHERE username = username_input
    )
    THEN 
        RAISE EXCEPTION 'Username % does not exist', username_input;
    END IF;

    SELECT password 
    INTO result
    FROM Users 
    WHERE username = username_input;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- CALL change_password('quachgiaphu', '4321')

--8--Lấy số trang còn lại của học sinh bằng mã số sinh viên
CREATE OR REPLACE FUNCTION get_number_page_default_remain(student_id_input VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
	IF NOT EXISTS (
		SELECT * FROM Users WHERE student_id = student_id_input
	)
	THEN 
	 	RAISE EXCEPTION 'Student_id % does not exist', student_id_input;
	END IF;
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
--Nếu date_start và date_end null thì lấy tất cả trang đã in
CREATE OR REPLACE FUNCTION get_number_page_was_printed(student_id_input VARCHAR, date_start_input DATE, date_end_input DATE)
RETURNS JSON AS $$
DECLARE
	number_page_was_printed INT;
BEGIN
	SELECT SUM(number_pages_of_file * number_copy) INTO number_page_was_printed
	FROM Printed_turn pt, Users u
	WHERE pt.username = u.username AND u.student_id = student_id_input AND
		  (date_start_input IS NULL OR date_start_input <= printing_date) AND
		  (date_end_input IS NULL OR date_end_input >= printing_date) ;
	
	RETURN json_build_object('number_page_was_printed', number_page_was_printed);
END;
$$ LANGUAGE plpgsql;

-- select get_number_page_was_printed('2213995', '2024-8-1', '2024-8-30')

--10--Lấy thông tin in ấn của một sinh viên bằng mã số sinh viên
--có thể lọc bằng printer_id, date_start, date_end
--nếu các giá trị trên là null nghĩa là chọn tất cả lịch sử
CREATE OR REPLACE FUNCTION get_log_a_student(student_id_input VARCHAR, printer_id_input INT, date_start_input DATE, date_end_input DATE)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(
		json_build_object(
			'student_id', u.student_id,
			'printer_id', pt.printer_id,
			'file_name', pt.file_name,
			'printing_date', pt.printing_date,
			'time_start', pt.time_start,
			'time_end', pt.time_end,
			'time_type', pt.file_type,
			'number_pages_of_file', pt.number_pages_of_file,
			'page_size', pt.page_size,
			'number_side', pt.number_side,
			'number_copy', pt.number_copy
       		)
	)
	INTO result
	FROM Users u, Printed_turn pt
	WHERE 	u.student_id = student_id_input AND u.username = pt.username AND 
			(printer_id_input IS NULL OR pt.printer_id = printer_id_input) AND
			(date_start_input IS NULL OR pt.printing_date >= date_start_input) AND
			(date_end_input IS NULL OR pt.printing_date <= date_end_input);

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_log_a_student('2213995', 1, null, null)

--11--Lấy lịch sử in ấn của toàn bộ sinh viên
--có thể lọc bằng printer_id, date_start, date_end
--nếu các giá trị trên là null nghĩa là chọn tất cả lịch sử
CREATE OR REPLACE FUNCTION get_log_all_student(printer_id_input INT, date_start_input DATE, date_end_input DATE)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(
		json_build_object(
			'student_id', u.student_id,
			'printer_id', pt.printer_id,
			'file_name', pt.file_name,
			'printing_date', pt.printing_date,
			'time_start', pt.time_start,
			'time_end', pt.time_end,
			'time_type', pt.file_type,
			'number_pages_of_file', pt.number_pages_of_file,
			'page_size', pt.page_size,
			'number_side', pt.number_side,
			'number_copy', pt.number_copy
       		)
	)
	INTO result
	FROM Users u, Printed_turn pt
	WHERE 	 u.username = pt.username AND 
			(printer_id_input IS NULL OR pt.printer_id = printer_id_input) AND
			(date_start_input IS NULL OR pt.printing_date >= date_start_input) AND
			(date_end_input IS NULL OR pt.printing_date <= date_end_input);

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- SELECT get_log_all_student(1, null, null)

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

--13--Bật máy in bằng id
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

--14--Tắt máy in bằng id
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

--15--Cập nhật thông tin máy in bằng id
--Check null các thuộc tính nếu null thì không cần đổi thông tin
CREATE OR REPLACE PROCEDURE update_printer_infor(
    printer_id_input INT, 
    brand_name_input VARCHAR, 
    printer_model_input VARCHAR, 
    description_input VARCHAR, 
    campus_input VARCHAR, 
    building_input VARCHAR, 
    room_input VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Printer
    SET 
        brand_name = COALESCE(brand_name_input, brand_name),
        printer_model = COALESCE(printer_model_input, printer_model),
        description = COALESCE(description_input, description),
        campus = COALESCE(campus_input, campus),
        building = COALESCE(building_input, building),
        room = COALESCE(room_input, room)
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

--18--Student nhấn nút in sẽ INSERT 1 printed_turn và cập nhật số lượng trang giấy còn lại
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
BEGIN 
	IF NOT EXISTS (SELECT * FROM Printing WHERE username = username_input AND printer_id = printer_id_input) THEN
		INSERT INTO Printing(username, printer_id) VALUES (username_input, printer_id_input)
	END IF;
	INSERT INTO printed_turn (username, printer_id , printing_date , time_start , time_end , file_name, file_type , number_pages_of_file, page_size , number_side, number_copy ) VALUES (username_input , printer_id_input, printing_date_input , time_start_input , time_end_input, file_name_input , file_type_input , number_page_of_file_input , page_size_input, number_size_input , number_copy_input );
END; $$; 

--SELECT page_remain from users where username = 'matruongvu'
--CALL print('matruongvu', 1, '2024-05-15', '09:28:11', '09:30:01', 'bao cao bai tap lon he co so du lieu', '.pdf', 2, 'A4', 2, 2)

----------------------------------------------------------------BUY PAPER--------------------------------------------------------

--19--Student mua giấy --> INSERT 1 purchase transaction

CREATE OR REPLACE PROCEDURE purchase_page (student_id_input VARCHAR, purchase_pages_input INT, purchase_date_input DATE, purchase_time_input TIME, paying_method_input VARCHAR, order_code_input VARCHAR)
LANGUAGE PLPGSQL 
AS $$ 
DECLARE name VARCHAR;
		price_page INT;
BEGIN 
	SELECT username INTO name 
	FROM users 
	WHERE student_id = student_id_input; 
	IF NOT EXISTS (
		SELECT * FROM Users WHERE student_id = student_id_input
	)
	THEN 
	 	RAISE EXCEPTION 'User % does not exist',student_id_input ;
	END IF;
	SELECT page_price INTO price_page
	FROM utility
	WHERE purchase_date_input >= date_start AND purchase_date_input <= date_end;
	
	INSERT INTO Purchase_transaction (username, purchase_pages, purchase_date, purchase_time, paying_method, order_code, total_cash) VALUES (name, purchase_pages_input,purchase_date_input,purchase_time_input,paying_method_input,order_code_input, purchase_pages_input * price_page);
	RAISE NOTICE 'Purchase recorded successfully for user %',student_id_input;
END; $$;

-- call purchase_page('2213995', 20, '2024-12-7', '12:00:00', 'VNPay', 'HCMUT-SPSS-2031')
--20--Lấy thông tin mua giấy của một sinh viên bằng mã số sinh viên
--bộ lọc bằng date_start date_end, nếu lấy tất cả thì 2 giá trị này bằng null.

CREATE OR REPLACE FUNCTION get_log_buy_page_a_student(
    student_id_input VARCHAR, 
    date_start_input DATE, 
    date_end_input DATE
)
RETURNS JSON 
LANGUAGE PLPGSQL 
AS $$  
DECLARE 
    result json;
    name VARCHAR; 
BEGIN 
    -- Validate if the student exists
    SELECT u.username
    INTO name
    FROM users u 
    WHERE u.student_id = student_id_input;  
    
    IF name IS NULL THEN
        RAISE EXCEPTION 'Student_id % does not exist', student_id_input; 
    END IF; 
    
    -- Fetch transactions and aggregate them into JSON
    SELECT json_agg(
        json_build_object(
            'student_id', student_id_input, 
            'username', name,
            'transaction_id', p.transaction_id, 
            'purchase_page', p.purchase_pages, 
            'purchase_date', p.purchase_date, 
            'purchase_time', p.purchase_time,
			'paying_method', p.paying_method,
			'order_code', p.order_code,
			'total_cash', p.total_cash
        ) ORDER BY p.transaction_id DESC
    )
    INTO result 
    FROM purchase_transaction p
    WHERE p.username = name AND 
          (date_start_input IS NULL OR p.purchase_date >= date_start_input) AND 
          (date_end_input IS NULL OR p.purchase_date <= date_end_input);

    RETURN result; 
END; 
$$;

-- select * from get_log_buy_page_a_student('2213969','2024-08-21',null)

--21--Lấy thông tin mua giấy của toàn bộ sinh viên
--bộ lọc bằng date_start date_end, nếu lấy tất cả thì 2 giá trị này bằng null.

CREATE OR REPLACE FUNCTION get_log_buy_page_all_student(date_start_input DATE, date_end_input DATE) 
RETURNS JSON
LANGUAGE PLPGSQL 
AS $$  
	DECLARE 
		result json;
BEGIN 
	SELECT json_agg(json_build_object( 
            'transaction_id', p.transaction_id, 
            'purchase_page', p.purchase_pages, 
            'purchase_date', p.purchase_date, 
            'purchase_time', p.purchase_time,
			'paying_method', p.paying_method,
			'order_code', p.order_code,
			'total_cash', p.total_cash
	  )ORDER BY p.transaction_id DESC
	)
	INTO result 
	FROM purchase_transaction p JOIN users u ON p.username = u.username
	WHERE
	(date_start_input IS NULL OR p.purchase_date >= date_start_input) AND 
	(date_end_input IS NULL OR p.purchase_date <= date_end_input );
	RETURN result; 
END;$$;

-- select * from get_log_buy_page_aLL_student(null,null)
----------------------------------------------------------------ULTILITY--------------------------------------------------------

--22--Thêm loại file in được
CREATE OR REPLACE PROCEDURE add_file_accepted(semester_input VARCHAR, type_accepted_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO File_types_accepted (semester, type_accepted)
    VALUES (semester_input, type_accepted_input);
END;
$$;

-- CALL add_file_accepted('251', '.bin')

--23--Xóa loại file in được
CREATE OR REPLACE PROCEDURE delete_file_accepted(semester_input VARCHAR, type_accepted_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM File_types_accepted
	WHERE semester = semester_input AND  type_accepted = type_accepted_input;
END;
$$;

-- CALL delete_file_accepted('251', '.bin')

--24--Thêm các thông số của học kì
CREATE OR REPLACE PROCEDURE add_utility_of_semester(semester_input VARCHAR, default_pages_input INT, date_reset_default_page_input DATE, page_price_input INT, date_start_input DATE, date_end_input DATE)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO Utility (semester, default_pages, date_reset_default_page, page_price, date_start, date_end)
    VALUES (semester_input, default_pages_input, date_reset_default_page_input, page_price_input, date_start_input, date_end_input);
END;
$$;

-- CALL add_utility_of_semester('261', 100, '2024-12-12', 2000)

--25--Lâý thông tin file_accepted theo kì 
CREATE OR REPLACE FUNCTION get_file_of_semester(f_semester VARCHAR) 
RETURNS JSON 
LANGUAGE plpgsql
AS $$ 
	declare result JSON;
BEGIN 
	SELECT json_agg(json_build_object(
		'accepted_file_type', type_accepted
	))
	INTO result
	FROM File_types_accepted
	WHERE semester = f_semester; 

	RETURN result; 
END; $$; 
--SELECT * from get_file_of_semester('232')

--26--Lấy các thông số in ấn của học kỳ
CREATE OR REPLACE FUNCTION get_utility_of_semester(f_semester VARCHAR) 
RETURNS JSON 
LANGUAGE plpgsql
AS $$ 
	declare result JSON;
BEGIN 
	SELECT json_agg(json_build_object(
		'semester', semester,
		'default_pages', default_pages,
		'date_reset_default_page', date_reset_default_page,
		'page_price', page_price,
		'date_start', date_start,
		'date_end', date_end
	))
	INTO result
	FROM Utility
	WHERE semester = f_semester; 

	RETURN result; 
END; 
$$; 
--SELECT * from get_utility_of_semester('232')

--27--
CREATE OR REPLACE FUNCTION get_utility_by_current_date(current_date_input DATE)
RETURNS JSON 
LANGUAGE plpgsql
AS $$ 
	declare result JSON;
BEGIN 
	SELECT json_agg(json_build_object(
		'semester', semester,
		'default_pages', default_pages,
		'date_reset_default_page', date_reset_default_page,
		'page_price', page_price,
		'date_start', date_start,
		'date_end', date_end
	))
	INTO result
	FROM Utility
	WHERE date_start <= current_date_input AND date_end >= current_date_input; 

	RETURN result; 
END; 
$$; 
--SELECT * from get_utility_by_current_date('2024-10-10')

--28--Lưu otp
CREATE OR REPLACE PROCEDURE add_otp_by_email(email_input VARCHAR, otp_code_input VARCHAR)
LANGUAGE plpgsql AS $$ 
BEGIN
    INSERT INTO OTP (email, otp_code)
    VALUES (email_input, otp_code_input);
END;
$$;
--CALL add_otp_by_email('tinhquach@hcmut.edu.vn','1234m5')

--29--Xóa otp
CREATE OR REPLACE PROCEDURE delete_otp_by_email(email_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM OTP
	WHERE email = email_input;
END;
$$;
-- CALL delete_otp_by_email('vumakhmtk22@hcmut.edu.vn')

--30--Lấy thông tin otp
CREATE OR REPLACE FUNCTION get_otp_by_email(email_input VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
			'otp_code', otp_code
       		)
    INTO result
    FROM OTP
	WHERE email = email_input;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

--SELECT * from get_otp_by_email('vumakhmtk22@hcmut.edu.vn')

------------------------------------------------------------REPORT--------------------------------------------------------

--31--Lấy số lượng người dùng trong khoảng thời gian chọn
--nếu không chọn thời gian thì truyền vào null

CREATE OR REPLACE FUNCTION get_number_user_using_system(date_start_input DATE, date_end_input DATE)
RETURNS JSON AS $$
DECLARE
	number_users INT;
BEGIN
	SELECT COUNT(DISTINCT username) 
	INTO number_users
	FROM Printed_turn pt
	WHERE(date_start_input IS NULL OR pt.printing_date >= date_start_input) 
		 AND (date_end_input IS NULL OR pt.printing_date <= date_end_input);
		 
    RETURN json_build_object('number_users', number_users);
END;
$$ LANGUAGE plpgsql;

-- SELECT get_number_user_using_system(null, null)

--32-- Lấy số lượng trang đã in toàn hệ thống trong khoảng thời gian chọn
--nếu không chọn thời gian thì truyền vào null
CREATE OR REPLACE FUNCTION get_number_page_was_printed_of_system(date_start_input DATE, date_end_input DATE)
RETURNS JSON AS $$
DECLARE
	number_page_was_printed INT;
BEGIN
	SELECT SUM(number_pages_of_file * number_copy) INTO number_page_was_printed
	FROM Printed_turn pt
	WHERE (date_start_input IS NULL OR date_start_input <= printing_date) 
		  AND (date_end_input IS NULL OR date_end_input >= printing_date) ;
	
	RETURN json_build_object('number_page_was_printed', number_page_was_printed);
END;
$$ LANGUAGE plpgsql;

-- SELECT get_number_page_was_printed_of_system(null, null)

--33-- Lấy mã học kì của tất cả học kì

CREATE OR REPLACE FUNCTION get_all_semester()
RETURNS JSON 
LANGUAGE plpgsql
AS $$ 
	declare result JSON;
BEGIN 
	SELECT json_agg(json_build_object('semester', semester))
	INTO result
	FROM Utility

	RETURN result; 
END; 
$$; 

-- SELECT get_all_semester()

CREATE OR REPLACE PROCEDURE update_admin_infor(
	last_name_input VARCHAR, 
	middle_name_input VARCHAR, 
	first_name_input VARCHAR, 
	email_input VARCHAR, 
	date_of_birth_input DATE, 
	phone_number_input VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE Users
	SET 
	    last_name = COALESCE(last_name_input, last_name),
        middle_name = COALESCE(middle_name_input, middle_name),
        first_name = COALESCE(first_name_input, first_name),
        email = COALESCE(email_input, email),
        date_of_birth = COALESCE(date_of_birth_input, date_of_birth),
        phone_number = COALESCE(phone_number_input, phone_number)
	WHERE role = 'ADMIN';
END;
$$;

CALL update_admin_infor('Quan', 'Han', 'Minh', 'quanhanminh@hcmut.edu.vn', '1990-08-08', '0903037102')

