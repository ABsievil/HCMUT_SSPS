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
public class PurchasePageDTO {
    private String studentId;
    private Integer purchasePages;
    private Date purchaseDate;
    private Time purchaseTime;
    private String payingMethod;
}