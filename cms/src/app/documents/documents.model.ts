export class Documents {
  public documentId: string;
  public name: string;
  public description: string;
  public fileUrl: string;
  public children: string;


  constructor(documentId: string, name: string, description: string, fileUrl: string, children: string){
    this.documentId = documentId;
    this.name = name;
    this.description = description;
    this.fileUrl = fileUrl;
    this.children = children;
  }
}
