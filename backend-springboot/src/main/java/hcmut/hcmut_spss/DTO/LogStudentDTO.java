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
public class LogStudentDTO {
    private Integer printerId;
    private Date dateStart;
    private Date dateEnd;
}
