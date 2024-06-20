export interface ProjectSpaceCard {
  name: string
  totalUsers?: number
  owner: string
  createTime: string
}

export interface UserData {
  role: string
  members?: number[]
}

export interface ProjectSpace {
  name: string
  description?: string
  uuid: string
  users: UserData[]
}
