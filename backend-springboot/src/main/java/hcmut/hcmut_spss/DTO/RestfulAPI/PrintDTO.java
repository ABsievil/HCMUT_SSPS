package hcmut.hcmut_spss.DTO.RestfulAPI;
import java.sql.Date;
import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrintDTO {
    private String username;
    private Integer printerId;
    private Date printingDate;
    private Time timeStart;
    private Time timeEnd;
    private String fileName;
    private String fileType;
    private Integer numberPageOfFile;
    private String pageSize;
    private Integer numberSize;
    private Integer numberCopy;
}