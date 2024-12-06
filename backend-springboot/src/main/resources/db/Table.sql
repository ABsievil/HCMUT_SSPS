CREATE TABLE Users (
	username VARCHAR(50) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	last_name VARCHAR(15) NOT NULL,
	middle_name VARCHAR(20),
	first_name VARCHAR(15) NOT NULL,
	email VARCHAR(100),
	date_of_birth DATE NOT NULL,
	phone_number VARCHAR(12),
	role VARCHAR(10),
	student_id VARCHAR(10),
	school_year VARCHAR(1),
	faculty VARCHAR(100),
	page_remain INT,
	CONSTRAINT check_page_remain CHECK (page_remain >= 0)
);

CREATE TABLE Printer (
	printer_id SERIAL PRIMARY KEY,
	brand_name VARCHAR(50),
	printer_model VARCHAR(50),
	description VARCHAR(200),
	campus VARCHAR(2) NOT NULL,
	building VARCHAR(2) NOT NULL,
	room VARCHAR(3) NOT NULL,
	state BOOL DEFAULT TRUE
);

CREATE TABLE Printing (
	username VARCHAR(50),
	printer_id INT,
	PRIMARY KEY (username, printer_id),
	FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (printer_id) REFERENCES Printer(printer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Printed_turn (
	username VARCHAR(50),
	printer_id INT,
	printing_date DATE,
	time_start TIME,
	time_end TIME,
	file_name VARCHAR(100),
	file_type VARCHAR(10),
	number_pages_of_file INT,
	page_size VARCHAR(2),
	number_side INT,
	number_copy INT,
	PRIMARY KEY (username, printer_id, printing_date, time_start, time_end, file_name, file_type, number_pages_of_file, page_size, number_side, number_copy),
	FOREIGN KEY (username, printer_id) REFERENCES Printing(username, printer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT check_number_side CHECK (number_side > 0),
	CONSTRAINT check_number_copy CHECK (number_copy > 0)
);


CREATE TABLE Purchase_transaction (
	username VARCHAR(50),
	transaction_id SERIAL,
	purchase_pages INT NOT NULL,
	purchase_date DATE,
	purchase_time TIME,
	paying_method VARCHAR(50) NOT NULL,
	order_code VARCHAR(50) NOT NULL,
	PRIMARY KEY (username, transaction_id),
	FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT check_purchase_pages CHECK (purchase_pages > 0)
);

CREATE TABLE Utility (
	semester VARCHAR(3) PRIMARY KEY,
	default_pages INT,
	date_reset_default_page DATE,
	page_price INT,
	date_start DATE,
	date_end DATE
);

CREATE TABLE File_types_accepted (
	semester VARCHAR(3),
	type_accepted VARCHAR(10),
	PRIMARY KEY (semester, type_accepted),
	FOREIGN KEY (semester) REFERENCES Utility(semester) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE OTP (
	email VARCHAR(50) PRIMARY KEY,
	otp_code VARCHAR(6)
)