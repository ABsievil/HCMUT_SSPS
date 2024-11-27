package hcmut.hcmut_spss.DTO.RestfulAPI;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAdminDTO {
    private String last_name;
    private String middle_name;
    private String first_name;
    private String email;
    private Date date_of_birth;
    private String phone_number;
}
