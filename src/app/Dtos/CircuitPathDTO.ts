export interface CircuitPathDTO {
  id: string;
  name: string;
  stages: StageDTO[];
}

export interface StageDTO {
  groupId: string;
  name: string;
  order: number;
  id: string;
}


export interface GroupDTO {
  id: string;
  name: string;
  users: UserDTO[];
}

interface UserDTO {
  id: string;
  name: string;
}

export interface WorkflowRequest{
  name: string;
  stages: StageDTO[];
}

export interface GroupsResponseDto
{
  groups: GroupDTO[];
}