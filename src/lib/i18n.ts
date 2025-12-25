export const translations = {
  en: {
    header: {
      title: 'LAN Party Starter',
      toggleLanguage: 'Toggle language',
    },
    gameList: {
        title: 'Your Games',
    },
    status: {
      lanMode: 'LAN Mode Ready',
      steamMode: 'Steam Mode',
    },
    disclaimer: {
      trigger: 'Legal Disclaimer',
      title: 'Legal & Compliance Notice',
      p1: 'This tool is intended solely for educational and research purposes within a private, household setting.',
      p2: 'It does not provide, facilitate the download of, or distribute any copyrighted game files. The purpose is to explore network programming and interoperability with the Steam API for legally owned games.',
      p3: 'This tool does not circumvent or crack any third-party Digital Rights Management (DRM) encryption.',
      p4: 'By using this tool, you acknowledge that you are using it with games you have legally purchased and are responsible for complying with all relevant EULAs and terms of service. The developers of this tool are not responsible for any misuse or any consequences thereof.',
      agree: 'I Understand',
    },
    gameDetails: {
      tabs: {
        dashboard: 'Dashboard',
        lobby: 'LAN Lobby',
        saves: 'Save Manager',
      },
    },
    mainDashboard: {
        status: {
            deploying: 'Deploying Goldberg emulator...',
            restoring: 'Restoring original files...',
        },
        buttons: {
            deploy: 'Deploy LAN Mode',
            restore: 'Restore to Steam',
            startGame: 'Start Game in LAN Mode',
        },
        footer: 'Deploying backs up original files and injects the LAN emulator. Restore reverts all changes.',
        identity: {
            title: 'Identity & Network',
            description: 'Set your unique identity for LAN sessions.',
            nicknameLabel: 'In-Game Nickname',
            nicknamePlaceholder: 'Enter your desired name',
            steamIdLabel: 'Generated SteamID',
        },
        compatReport: {
            title: 'Compatibility Report',
            description: 'Automated analysis for {{gameName}}.',
            drm: '3rd Party DRM (e.g. Denuvo)',
            detected: 'Detected',
            notDetected: 'Not Detected',
            seamlessCoop: 'Seamless Co-op Mod',
            recommended: 'Recommended',
            notRequired: 'Not Required',
            savePath: 'Default Save Path',
            footer: 'This data is from a cloud compatibility database.',
        }
    },
    lanLobby: {
        connectionTester: {
            title: 'Connection Tester',
            description: 'Manually test the connection to another player on your LAN.',
            ipLabel: "Player's LAN IP Address",
            ipPlaceholder: 'e.g., 192.168.1.101',
            pingButton: 'Ping',
        },
        pingResult: {
            latency: 'Latency',
            packetLoss: 'Packet Loss',
            jitter: 'Jitter',
        },
        lanPeers: {
            title: 'LAN Peers',
            description: 'Players discovered on your network.',
            statusOnline: 'Online',
            statusOffline: 'Offline',
        },
        firewall: {
            title: 'Firewall & Ports',
            description: 'Check for common connection blockers.',
            goldbergPort: 'Goldberg Port (UDP)',
            statusOpen: 'Open',
            windowsFirewall: 'Windows Firewall',
            statusBlocking: 'Blocking',
            addExceptionButton: 'Add Firewall Exception',
        },
    },
    saveManager: {
        sync: {
            title: 'Save Game Sync',
            description: 'Manage and transfer your save files between modes.',
            steamPathLabel: 'Original Steam Save Path',
            lanPathLabel: 'LAN Mode (Goldberg) Save Path',
            importButton: 'Import Latest Steam Save to LAN Mode',
            footer: 'This action copies and renames your Steam save for Goldberg compatibility.',
        },
        backups: {
            title: 'Save Snapshots & Backups',
            description: 'Create and manage automatic save backups.',
            customDirectoryLabel: 'Custom Backup Directory',
            frequencyLabel: 'Auto-Backup Frequency: {{minutes}} mins',
            backupButton: 'Create Manual Backup Now',
        },
        history: {
            title: 'Backup History',
            description: 'Restore your game to a previous state.',
            snapshotLabel: 'Snapshot #{{id}}',
            restoreButton: 'Restore',
        },
    },
    toasts: {
        cloudDbUnreachable: {
            title: 'Cloud DB Unreachable',
            description: 'Using local compatibility data.',
        },
        ipRequired: {
            title: 'IP Address Required',
            description: 'Please enter an IP address to test.',
        },
        connectionFailed: {
            title: 'Connection Failed',
            description: 'Could not reach {{ipAddress}}. Check the IP and network connection.',
        },
        firewallRuleAdded: {
            title: 'Firewall Rule Added',
            description: 'This application has been whitelisted in Windows Firewall.',
        },
        deploymentSuccessful: {
            title: 'Deployment Successful',
            description: '{{gameName}} is now ready for LAN play.',
        },
        restoreComplete: {
            title: 'Restore Complete',
            description: '{{gameName}} has been restored to Steam mode.',
        },
        copiedToClipboard: {
            title: 'Copied to Clipboard',
            description: '{{label}} has been copied.',
        },
        startingGame: {
            title: 'Starting Game...',
            description: 'Launching {{gameName}}. Please ensure Steam is closed.',
        },
        pathCopied: {
            title: 'Path Copied',
            description: 'The directory path has been copied to your clipboard.',
        },
        importingSteamSave: {
            title: 'Importing Steam Save',
            description: 'Simulating import of latest Steam save for {{gameName}}.',
        },
        manualBackupCreated: {
            title: 'Manual Backup Created',
            description: 'A new save snapshot has been created.',
        },
        rollbackSuccessful: {
            title: 'Rollback Successful',
            description: 'Save snapshot #{{snapshotId}} has been restored.',
        },
    }
  },
  zh: {
    header: {
      title: '局域网派对启动器',
      toggleLanguage: '切换语言',
    },
    gameList: {
        title: '你的游戏',
    },
    status: {
        lanMode: '局域网模式准备就绪',
        steamMode: 'Steam 模式',
    },
    disclaimer: {
        trigger: '法律免责声明',
        title: '法律与合规声明',
        p1: '本工具仅用于在私人家庭环境中的教育和研究目的。',
        p2: '本工具不提供、不协助下载、也不分发任何受版权保护的游戏文件。其目的是探索网络编程以及与合法拥有游戏的 Steam API 的互操作性。',
        p3: '本工具不规避或破解任何第三方数字版权管理 (DRM) 加密。',
        p4: '使用本工具即表示您承认您是将其用于您合法购买的游戏，并有责任遵守所有相关的最终用户许可协议 (EULA) 和服务条款。本工具的开发者不对任何滥用或由此产生的任何后果负责。',
        agree: '我明白了',
    },
    gameDetails: {
        tabs: {
            dashboard: '仪表盘',
            lobby: '局域网大厅',
            saves: '存档管理器',
        },
    },
    mainDashboard: {
        status: {
            deploying: '正在部署 Goldberg 模拟器...',
            restoring: '正在恢复原始文件...',
        },
        buttons: {
            deploy: '部署局域网模式',
            restore: '恢复到 Steam',
            startGame: '以局域网模式启动游戏',
        },
        footer: '部署操作会备份原始文件并注入局域网模拟器。恢复操作将撤销所有更改。',
        identity: {
            title: '身份与网络',
            description: '为局域网会话设置您的唯一身份。',
            nicknameLabel: '游戏内昵称',
            nicknamePlaceholder: '输入您想要的名称',
            steamIdLabel: '生成的 SteamID',
        },
        compatReport: {
            title: '兼容性报告',
            description: '针对 {{gameName}} 的自动分析。',
            drm: '第三方 DRM (例如 Denuvo)',
            detected: '已检测到',
            notDetected: '未检测到',
            seamlessCoop: '无缝合作 Mod',
            recommended: '推荐',
            notRequired: '不需要',
            savePath: '默认存档路径',
            footer: '此数据来自云端兼容性数据库。',
        },
    },
    lanLobby: {
        connectionTester: {
            title: '连接测试器',
            description: '手动测试与局域网内另一名玩家的连接。',
            ipLabel: '玩家的局域网 IP 地址',
            ipPlaceholder: '例如，192.168.1.101',
            pingButton: 'Ping',
        },
        pingResult: {
            latency: '延迟',
            packetLoss: '丢包率',
            jitter: '抖动',
        },
        lanPeers: {
            title: '局域网对等体',
            description: '在您的网络上发现的玩家。',
            statusOnline: '在线',
            statusOffline: '离线',
        },
        firewall: {
            title: '防火墙和端口',
            description: '检查常见的连接阻碍。',
            goldbergPort: 'Goldberg 端口 (UDP)',
            statusOpen: '开放',
            windowsFirewall: 'Windows 防火墙',
            statusBlocking: '阻止',
            addExceptionButton: '添加防火墙例外',
        },
    },
    saveManager: {
        sync: {
            title: '游戏存档同步',
            description: '在不同模式之间管理和传输您的存档文件。',
            steamPathLabel: '原始 Steam 存档路径',
            lanPathLabel: '局域网模式 (Goldberg) 存档路径',
            importButton: '将最新的 Steam 存档导入到局域网模式',
            footer: '此操作会复制并重命名您的 Steam 存档以兼容 Goldberg。',
        },
        backups: {
            title: '存档快照和备份',
            description: '创建和管理自动存档备份。',
            customDirectoryLabel: '自定义备份目录',
            frequencyLabel: '自动备份频率: {{minutes}} 分钟',
            backupButton: '立即创建手动备份',
        },
        history: {
            title: '备份历史',
            description: '将您的游戏恢复到以前的状态。',
            snapshotLabel: '快照 #{{id}}',
            restoreButton: '恢复',
        },
    },
    toasts: {
        cloudDbUnreachable: {
            title: '云数据库无法访问',
            description: '正在使用本地兼容性数据。',
        },
        ipRequired: {
            title: '需要 IP 地址',
            description: '请输入一个 IP 地址进行测试。',
        },
        connectionFailed: {
            title: '连接失败',
            description: '无法访问 {{ipAddress}}。请检查 IP 和网络连接。',
        },
        firewallRuleAdded: {
            title: '已添加防火墙规则',
            description: '此应用程序已在 Windows 防火墙中被列入白名单。',
        },
        deploymentSuccessful: {
            title: '部署成功',
            description: '{{gameName}} 现在已准备好进行局域网游戏。',
        },
        restoreComplete: {
            title: '恢复完成',
            description: '{{gameName}} 已恢复到 Steam 模式。',
        },
        copiedToClipboard: {
            title: '已复制到剪贴板',
            description: '{{label}} 已被复制。',
        },
        startingGame: {
            title: '正在启动游戏...',
            description: '正在启动 {{gameName}}。请确保 Steam 已关闭。',
        },
        pathCopied: {
            title: '路径已复制',
            description: '目录路径已复制到您的剪贴板。',
        },
        importingSteamSave: {
            title: '正在导入 Steam 存档',
            description: '正在模拟导入 {{gameName}} 的最新 Steam 存档。',
        },
        manualBackupCreated: {
            title: '手动备份已创建',
            description: '一个新的存档快照已创建。',
        },
        rollbackSuccessful: {
            title: '回滚成功',
            description: '存档快照 #{{snapshotId}} 已恢复。',
        },
    },
  },
};

// This creates a union type of all the keys in the translations object.
// It's a bit of a trick to get TypeScript to autocomplete the keys.
type NestedKey<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${NestedKey<T[K]>}`}`
    }[keyof T]
  : '';

export type TranslationKey = NestedKey<typeof translations.en>;
