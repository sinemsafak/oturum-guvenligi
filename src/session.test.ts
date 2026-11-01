
// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import {
  clearSession,
  hasSession,
  saveDemoToken,
} from "./session";

const STORAGE_KEY = "oturum_guvenligi_demo_token";

describe("Oturum depolama işlemleri", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("örnek belirteci localStorage içine kaydeder", () => {
    saveDemoToken();

    expect(localStorage.getItem(STORAGE_KEY)).toBe(
      "demo-access-token-not-for-production",
    );
  });

  it("belirteç yokken oturumun kapalı olduğunu bildirir", () => {
    expect(hasSession()).toBe(false);
  });

  it("belirteç kaydedildiğinde oturumun açık olduğunu bildirir", () => {
    saveDemoToken();

    expect(hasSession()).toBe(true);
  });

  it("oturum kapatıldığında belirteci siler", () => {
    saveDemoToken();

    clearSession();

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(hasSession()).toBe(false);
  });
});
