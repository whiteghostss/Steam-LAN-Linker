# **App Name**: LAN Party Starter

## Core Features:

- Steam Game Detection: Automatically identify installed Steam games by reading `libraryfolders.vdf`. Determines compatibility by checking for `steam_api(64).dll` and checking DRM status via the SteamDB API. Alerts user if a game has 3rd party DRM.
- Goldberg Emulator Deployment: Automatically backs up the original `steam_api64.dll` by cloning it with a `.orig` extension, then deploys Goldberg Emulator. It automatically detects whether the game is 32 or 64 bit and deploys the correct DLL version. It automatically extracts the AppID from the `appmanifest_xxx.acf` file.
- Identity Management: Generates a unique 17-digit SteamID for each machine using a random number generator.  Also enables users to modify the in-game player name using a UI input box.
- Save Game Management: Provides buttons that open both the original Steam save directory, and the Goldberg save directory. It provides functionality to import current Steam saves into LAN mode by renaming the suffix of the save files. Allows the user to configure a custom save directory (even to a cloud drive folder) and set periodic backups. The app will use the `FileSystemWatcher` API to monitor and back up the user's game saves.
- Network Diagnostic Tool: Detect LAN peers. Manually input the LAN IP (or Radmin LAN virtual IP) of another player. Test base latency, packet loss using ICMP packets, and high-frequency ping to evaluate network jitter and whether you're fit to be a host. Automatically scan Goldberg ports to check for firewall blocking, and offers to whitelist the application if it finds such blocking.
- Steam Interfaces File (steam_interfaces.txt) Generator: Includes an interface scanner algorithm to automatically analyze original DLL's export functions and generate `steam_interfaces.txt`, maximizing game connection success rate.
- Cloud Compatibility DB Tool: Connects to a cloud database of compatibility info which this tool will use as a tool, so that it can perform specialized actions on specific games. For instance, Elden Ring requires the 'seamless co-op' mod, for which the app must provide a toggle.

## Style Guidelines:

- Primary color: Deep purple (#673AB7) to represent the technological and slightly mysterious nature of bypassing Steam's standard functionality.
- Background color: Dark gray (#303030) for a modern, tech-focused feel, fitting the app's purpose.
- Accent color: Electric blue (#29ABE2) to highlight interactive elements and provide a clear visual cue for primary actions.
- Headline font: 'Space Grotesk' sans-serif for headlines, paired with 'Inter' for body text. Note: currently only Google Fonts are supported.
- Use clean, modern icons to represent different game functions, save states, and network statuses. Each icon will be distinct to provide clear and easy identification.
- Implement a split-screen layout with a game list on the left and detailed settings on the right. The 'LAN Lobby' tab has network testing tools to its left and lists the network-connected players to its right. At the top, the Save Archive tab will provide a summary of the user's backup settings.
- Employ subtle animations for actions like deploying the emulator or backing up saves, using progress bars and system tray bubble notifications.