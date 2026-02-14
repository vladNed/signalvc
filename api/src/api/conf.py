import pydantic
import pydantic_settings


class PostgresSettings(pydantic.BaseModel):
    user: str = ""
    password: str = ""
    db: str = ""
    host: str = ""

    @classmethod
    def empty_instance(cls) -> "PostgresSettings":
        return cls(user="", password="", db="", host="")

    @property
    def url(self) -> str:
        return pydantic.PostgresDsn.build(
            scheme="postgresql",
            username=self.user,
            password=self.password,
            host=self.host,
            port=5432,
            path=f"{self.db}",
        ).encoded_string()


class SupabaseSettings(pydantic.BaseModel):
    url: str = ""
    key: str = ""

    @classmethod
    def empty_instance(cls) -> "SupabaseSettings":
        return cls(url="", key="")


class Settings(pydantic_settings.BaseSettings):
    model_config = pydantic_settings.SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        nested_model_default_partial_update=True,
        env_nested_delimiter="__",
    )

    app_name: str = "veridion-api"
    app_log_level: str = ""

    postgres: PostgresSettings = PostgresSettings.empty_instance()
    supabase: SupabaseSettings = SupabaseSettings.empty_instance()


def get_settings() -> Settings:
    return Settings()


settings = get_settings()
