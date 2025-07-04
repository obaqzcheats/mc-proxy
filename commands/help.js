module.exports = {
    name: "help",
    execute(player, args, respond) {
      const info = {
        crash: "§c\n  §b§l.crash §3<type>\n\n §7§opowered by §b§lcrashing v2",
        discord: "§c\n  §b§l.discord\n\n §7§opowered by §b§lcrashing v2",
        version: "§c\n  §b§l.version\n\n §7§opowered by §b§lcrashing v2",
        bed: "§c\n  §b§l.bed <all/user>\n\n §7§opowered by §b§lcrashing v2",
        message: "§c\n  §b§l.message §3<type> <msg>\n\n §7§opowered by §b§lcrashing v2",
        report: "§c\n  §b§l.report §3<player> <reason> NOT READY\n\n §7§opowered by §b§lcrashing v2"
      }
      if (!args.length) {
        return respond("§c\n  §b§l.help §3<cmd>\n\n§b§l.crash\n§b§l.discord\n§b§l.report\n§b§l.bed\n§b§l.message\n§b§l.version\n§b§l.help\n\n §7§opowered by §b§lcrashing v2")
      }
      respond(info[args[0]] || '')
    }
  }
  