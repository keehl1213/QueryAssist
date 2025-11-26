import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class BackOrderShortageInquireRequestDTO {
	/**
	 * Region
	 * 若inquireType = '21'，則不需要填寫
	 *
	 * @example "EMEA"
	 */
	@ApiProperty({ example: 'EMEA' })
	@IsOptional()
	region?: string | null | undefined;

	/**
	 * PN = part number = 料號
	 * 若inquireType = 'regional_overall'，則不需要填寫
	 *
	 * @example "701429-001"
	 */
	@ApiProperty({ example: '701429-001' })
	@IsOptional()
	pn?: string | null | undefined;

	/**
	 * MO = EVENT_NO
	 *
	 * @example "MO-EV2081028"
	 */
	@ApiProperty({ example: 'MO-EV2081028' })
	@IsOptional()
	MO?: string | null | undefined;

	/**
	 * DO = HP_DN
	 *
	 * @example "3008101128"
	 */
	@ApiProperty({ example: '3008101128' })
	@IsOptional()
	DO?: string | null | undefined;

	/**
	 * SO = HP_ORDNO
	 *
	 * @example "6020810828"
	 */
	@ApiProperty({ example: '6020810828' })
	@IsOptional()
	SO?: string | null | undefined;

	/**
	 * 查詢的類型
	 * 01: 查詢 BO狀態
	 * 02: 查詢 BO數量
	 * 03: 查詢 BO原因、Delay原因、為什麼缺料、分析原因
	 * 04: 查詢 LT、MOQ、Price
	 * 05: 查詢 庫存、庫存數量
	 * 06: 查詢 return rate、scrap rate、Recycle rate、 repair rate
	 * 07: 查詢 EUDF
	 * 08: 查詢 FCS、EOSL
	 * 09: 查詢 HP excess、SMS excess
	 * 10: 查詢 OPO
	 * 11: 查詢 買多少、需要多少、ROQ、Buy、New buy
	 * 12: 查詢 defective、WIP數量、WIP、IRR、RTV、repair
	 * 13: 查詢 Planner comment、BO Comment
	 * 14: 查詢 BO action、BO進展
	 * 15: 查詢 Material report、BO projection、Inventory projection、FCST historical data、Escalation report、Bo Summary report
	 * 16: 查詢 kitting、de-kitting、組裝、拆解
	 * 17: 查詢 NPI、NPI PO ETD
	 * 18: 查詢 Other regions、其他地區的庫存
	 * 19: 查詢 Historical order、RDC order
	 * 20: 查詢 ETD、交期
	 * 21: 查詢 MO、DO、SO狀態，例如Status of PN: XXX under MO: YYY, Status of DO: 3007793020
	 * regional_overall: 查詢 overall status of region, or regional summary of region, or overall situation of region, or total status of region
	 *
	 * @example "01"
	 */
	@ApiProperty({ example: '01' })
	@IsNotEmpty()
	inquireType: string;
}
