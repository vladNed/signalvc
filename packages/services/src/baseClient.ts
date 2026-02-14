import type { ApiResponse, RequestOptions } from "@signalvc/types";
import { SupabaseClient } from "@supabase/supabase-js";

class BaseApiClient {
  protected readonly baseUrl: string;
  protected readonly authClient: SupabaseClient;

  constructor(baseUrl: string, authClient: SupabaseClient) {
    this.baseUrl = baseUrl;
    this.authClient = authClient;
  }

  protected buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined | null>,
  ): string {
    const fullPath = path.startsWith("http") ? path : `${this.baseUrl}/${path.replace(/^\//, "")}`;

    if (!params) return fullPath;

    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");

    return query ? `${fullPath}?${query}` : fullPath;
  }

  /// Safely parse JSON response, fallback to text if JSON parsing fails... Idk sometimes I am scared.
  protected async safeParseJson(response: Response): Promise<unknown> {
    return await response.json();
  }

  protected async getAuthHeaders(): Promise<Record<string, string>> {
    const session = await this.authClient.auth.getSession();
    const accessToken = session?.data?.session?.access_token;
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  protected async request<TResponse>(
    path: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<TResponse>> {
    const { method = "GET", body, headers = {}, params } = options;
    const url = this.buildUrl(path, params);
    const authHeaders = await this.getAuthHeaders();
    const mergedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeaders,
      ...headers,
    };

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      throw new Error(`Network error: ${error instanceof Error ? error.message : String(error)}`);
    }

    if (!response.ok) {
      const errorBody = await this.safeParseJson(response);
      throw new Error(
        `HTTP error: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`,
      );
    }

    const data = await this.safeParseJson(response);
    return { data } as ApiResponse<TResponse>;
  }
}

export { BaseApiClient };
