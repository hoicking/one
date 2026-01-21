export interface BrandItem {
  createBy: string | null;
  createTime: string | null;
  updateBy: string | null;
  updateTime: string | null;
  remark: string | null;
  dictCode: number;
  dictSort: number;
  dictLabel: string;
  dictValue: string;
  dictType: string;
  cssClass: string | null;
  listClass: string | null;
  isDefault: string;
  status: string;
  default: boolean;
}
