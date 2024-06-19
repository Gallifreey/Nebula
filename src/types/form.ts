import { Dayjs } from "dayjs";

export type RangeValue = [Dayjs, Dayjs];

export interface CommodityBasicInfoData {
    name: string,
    description?: string,
    salePrice: number,
    distributionPrice?: number,
    brand: string,
    deliveyState?: number,
    unit?: number,
    weight?: number
}
export interface CommodityBOMData {
    bomName: string,
    parentBomID: number,
    childrenBomID: number[],
    assemblePrice: number,
    splitPrice: number,
    costFomula: string
}
export interface CommoditySKUData {
    skuColor?: string,
    skuSize?: number[],
    skuBarCodeMsg: string,
    skuAssociatedID: number,
    skuWeight: number
}
export interface CommodityMetaData {
    barCodeMsg: string,
    picture: string
}
export interface CommodityData {
    basicInfo: CommodityBasicInfoData,
    bom: CommodityBOMData,
    sku: CommoditySKUData,
    meta: CommodityMetaData
}

export const CommodityHolderValue: CommodityData = {
    basicInfo: {
        name: "",
        salePrice: 0,
        brand: ""
    },
    bom: {
        bomName: "",
        parentBomID: 0,
        childrenBomID: [],
        assemblePrice: 0,
        splitPrice: 0,
        costFomula: ""
    },
    sku: {
        skuBarCodeMsg: "",
        skuSize: [0, 0, 0],
        skuAssociatedID: 0,
        skuWeight: 0
    },
    meta: {
        barCodeMsg: "",
        picture: ""
    }
}