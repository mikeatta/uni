class GoogleAuthService {
  private static instance: GoogleAuthService
  private accessToken: string | null = null

  private constructor() {}

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService()
    }
    return GoogleAuthService.instance
  }

  public setAccessToken(token: string) {
    this.accessToken = token
  }

  public getAccessToken(): string | null {
    return this.accessToken
  }
}

export default GoogleAuthService.getInstance()
