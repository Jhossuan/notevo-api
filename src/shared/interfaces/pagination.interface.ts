export interface IPaginationMetadata {
    currentPage: number;
    lastPage: number;
    totalDocuments: number;
}

export interface IPagination {
    page: number;
    limit: number;
}