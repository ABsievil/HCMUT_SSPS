package hcmut.hcmut_spss.DTO;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private String username;
    private String password;
    private String last_name;
    private String middle_name;
    private String first_name;
    private String email;
    private Date date_of_birth;
    private String phone_number;
    private String role;
    private String student_id;
    private String school_year;
    private String faculty;
    private Integer page_remain;
}