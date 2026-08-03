import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { CommandPalette } from "../command-palette";

const { mockPush, mockSetTheme, mockToast, mockWriteText } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSetTheme: vi.fn(),
  mockToast: vi.fn(),
  mockWriteText: vi.fn(),
}));

const pathnameRef = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => pathnameRef.current,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: mockSetTheme }),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  // jsdom does not implement scrollIntoView; cmdk and section jumps rely on it.
  Element.prototype.scrollIntoView = vi.fn();
});

describe("CommandPalette", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pathnameRef.current = "/";
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: mockWriteText },
    });
    mockWriteText.mockResolvedValue(undefined);
  });

  it("is not open by default", () => {
    render(<CommandPalette />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens when Cmd+K is pressed", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens when Ctrl+K is pressed", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "K", ctrlKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not open when ⌘K is pressed while typing in an input", () => {
    render(
      <div>
        <input aria-label="Search field" />
        <CommandPalette />
      </div>
    );
    fireEvent.keyDown(screen.getByLabelText("Search field"), {
      key: "k",
      metaKey: true,
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("lists the expected routes in the Navigate group", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Navigate")).toBeInTheDocument();

    for (const label of [
      "Home",
      "Projects",
      "Articles",
      "About",
      "Contact",
      "IMAT",
      "Fable-5",
    ]) {
      expect(
        within(dialog).getAllByRole("option", { name: new RegExp(label, "i") })
          .length
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("navigates and closes when a route is selected", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });

    const navigateProjects = screen.getAllByRole("option", {
      name: /projects/i,
    })[0];
    fireEvent.click(navigateProjects);

    expect(mockPush).toHaveBeenCalledWith("/projects");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("switches theme when a Theme item is selected", () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });

    fireEvent.click(screen.getByRole("option", { name: "Light" }));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("copies the email to the clipboard and shows a confirmation toast", async () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });

    fireEvent.click(screen.getByRole("option", { name: /copy email/i }));

    expect(mockWriteText).toHaveBeenCalledWith("mannkanit@gmail.com");
    await vi.waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Email copied" })
      )
    );
  });

  it("scrolls to a homepage section when a Jump to item is selected", () => {
    render(
      <div>
        <div id="experience" />
        <CommandPalette />
      </div>
    );
    fireEvent.keyDown(window, { key: "k", metaKey: true });

    fireEvent.click(screen.getByRole("option", { name: "Experience" }));

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates to a homepage anchor from another page", () => {
    pathnameRef.current = "/projects";
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });

    fireEvent.click(screen.getByRole("option", { name: "Experience" }));

    expect(mockPush).toHaveBeenCalledWith("/#experience");
  });

  it("closes on Escape and restores focus to the previously focused element", async () => {
    render(
      <CommandPalette>
        <button type="button">Focus me</button>
      </CommandPalette>
    );
    const trigger = screen.getByRole("button", { name: "Focus me" });
    trigger.focus();

    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // Radix restores focus to the previously focused element on a setTimeout.
    await vi.waitFor(() => expect(trigger).toHaveFocus());
  });
});
