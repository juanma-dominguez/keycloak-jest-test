export interface ProjectDomainModel {
  id: string;
  name: string;
  desc: string;
  ownerName: string;
}

export interface ProjectsDomainModel {
  projects?: ProjectDomainModel[] | null;
}
