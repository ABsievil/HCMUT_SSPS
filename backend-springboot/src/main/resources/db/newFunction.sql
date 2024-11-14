--------------------------------------------------------STUDENT-ADMIN INFOR------------------------------------------------------
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
    INSERT INTO Users (username, password, last_name, middle_name, first_name, email, 
						date_of_birth, phone_number, role, student_id, school_year, faculty, page_remain)
    VALUES (username_input, password_input, last_name_input, middle_name_input, first_name_input,
			email_input, date_of_birth_input, phone_number_input, role_input, student_id_input, 
			school_year_input, faculty_input, page_remain_input);
END;
$$;

-- CALL add_student('quachgiaphu', '$2a$10$TzDeitFt5kFI6nQgLPqJfelouc08AWJAr4tQZyr96X6nal7pw4oBi', 'Quach', 'Gia', 'Phu', 'quachgiaphu@gmail.com',
--  				'2004-9-17', '0976251672', 'USER', '2213662', '2', 'Computer Science', 100)

CREATE OR REPLACE PROCEDURE delete_student(username_input VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM Users
	WHERE username = username_input;
END;
$$;

-- CALL delete_student('quachgiaphu')

CREATE OR REPLACE PROCEDURE update_student_infor(
	username_input VARCHAR,  
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
	WHERE username = username_input;
END;
$$;

-- CALL update_student_infor('quachgiaphu', 'Quach', 'Gia', 'Phu', 'quachgiaphu@gmail.com', '2004-9-17', '0976251672', '3', 'Electric')

