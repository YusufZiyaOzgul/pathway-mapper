/// <reference types="jquery" />
export default class GenomicDataOverlayManager {
    genomicDataMap: {};
    visibleGenomicDataMapByType: {};
    groupedGenomicDataCount: number;
    groupedGenomicDataMap: {};
    patientData: any;
    private DEFAULT_VISIBLE_GENOMIC_DATA_COUNT;
    private observers;
    private cy;
    constructor(cy: any);
    getEmptyGroupID(): number;
    addGenomicDataLocally(genomicData: any, groupID: any): void;
    preparePortalGenomicDataShareDB(genomicData: any): {
        genomicDataMap: {};
        visibilityMap: {};
    };
    addGenomicData(data: any): void;
    removeGenomicVisData(): void;
    addGenomicDataWithGeneSymbol(geneSymbol: any, data: any): void;
    addGenomicGroupData(groupID: any, data: any): void;
    addPortalGenomicData(data: any, groupID: any): void;
    clearAllGenomicData: () => void;
    removeGenomicData(): void;
    removeGenomicDataWithGeneSymbol(geneSymbol: any): void;
    addGenomicVisData(key: any, data: any): void;
    prepareGenomicDataShareDB: (genomicData: any) => {
        genomicDataMap: {};
        visibilityMap: {};
    };
    updateGenomicDataVisibility: (_key: any, isVisible: any) => void;
    hideGenomicData: () => void;
    countVisibleGenomicDataByType(): number;
    generateSVGForNode(ele: any): any;
    getRequiredWidthForGenomicData(genomicDataBoxCount: any): number;
    showGenomicData(): void;
    parseGenomicData(genomicData: any, groupID: any): void;
    registerObserver(observer: any): void;
    notifyObservers(): void;
    getAlterationCountForPatient(geneData: any): number;
    showPatientData(): void;
    getOncoprintColors(selectedGene: any): any;
    generateSVGForPatientNode(ele: any, patientData: any): any;
    generateOncoprintForPatientNode(ele: any): any;
    getCNADisplayString(alterationTypeKey: number): string;
    generateSvgIconForSample(iconColor: string, iconText: string): string;
    generateHTMLContentForNodeTooltip(ele: any, patientData: any): JQuery<HTMLElement>;
}
