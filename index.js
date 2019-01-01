const discord = require("discord.js");
const bot = new discord.Client();

bot.on('ready', () => {
  bot.user.setActivity("-help", { type: "PLAYING" })
  console.log(`Succesfully started!`)
})

bot.on("message", message => {

  if (message.author.bot) return;

  if (message.channel.type === "dm") {
    return message.channel.send(":no_entry_sign: **Direct Message's are disabled** ")
  }

  var messageArray = message.content.split(" ");
  var command = messageArray[0];

  if (command === "-help") {

    // return message.channel.send(":no_entry_sign: **This function is currently disabled**")

    var botIcon = bot.user.displayAvatarURL;

    var helpEmbed = new discord.RichEmbed()
      .setTitle("XOL Design Bot Help")
      .setThumbnail(botIcon)
      .setColor("#FA8072")
      .addField("-help", "Get an overview with all the bot-commands")
      .addField("-design <name designer>", "Create a channel with you and a designer where you can request designs.")
      .addField("-designers", "Get a list of all known designer for the -design command")
      .addField("-close", "Close a channel. (Designers only)")
      .setFooter("Bot Version 1.0")

    return message.channel.send(helpEmbed)
  }

  if (command === "-design") {

    // return message.channel.send(":no_entry_sign: **This function is currently disabled**")

    if (messageArray[1] == null) {
      return message.channel.send(":x: You need to choose a designer")
    }

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    const nathanId = "525265308991356930";
    const gioId = "525265338338639902";
    var categoryId = "ID";

    var designer = messageArray[1].toLowerCase();

    var nathanRank = message.guild.roles.find("name", "Nathan");
    var gioRank = message.guild.roles.find("name", "Gio")

    if (designer == "nathan") {
      if (message.member.roles.has(nathanRank.id)) {
        message.channel.send(":arrows_counterclockwise: Channel is being created")

        message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {
          var everyone = message.guild.roles.find("name", "@everyone")
          var designerRole = message.guild.roles.find("name", "Designer")
          var botRole = message.guild.roles.find("name", "BOT")

          createdChan.setParent(nathanId).then((settedParent) => {
            settedParent.overwritePermissions(everyone, { "READ_MESSAGES": false });

            settedParent.overwritePermissions(botRole, { "READ_MESSAGES": true, "SEND_MESSAGES": true });

            settedParent.overwritePermissions(designerRole, { "READ_MESSAGES": true, "SEND_MESSAGES": true, "ATTACH_FILES": true });

            settedParent.overwritePermissions(message.author, { "READ_MESSAGES": true, "SEND_MESSAGES": true, "ATTACH_FILES": true });

            settedParent.send("This is your channel where you can request a design.\nI will respond as soon as possible.\nGreetings Nathan.");

          })
        })
      return;
      }
      if (!message.member.roles.has(nathanRank.id)) {
        return message.channel.send(":x: You don't have permissions to send a request to this designer")
      }
    }
        if (designer == "gio") {
          if (message.member.roles.has(gioRank.id)) {
            message.channel.send(":arrows_counterclockwise: Channel is being created")

            message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {
            var everyone = message.guild.roles.find("name", "@everyone")
            var designerRole = message.guild.roles.find("name", "Designer")
            var botRole = message.guild.roles.find("name", "BOT")

            createdChan.setParent(gioId).then((settedParent) => {
              settedParent.overwritePermissions(everyone, { "READ_MESSAGES": false });

              settedParent.overwritePermissions(botRole, { "READ_MESSAGES": true,   "SEND_MESSAGES": true });

              settedParent.overwritePermissions(designerRole, { "READ_MESSAGES": true, "SEND_MESSAGES": true, "ATTACH_FILES": true });

              settedParent.overwritePermissions(message.author, { "READ_MESSAGES": true, "SEND_MESSAGES": true, "ATTACH_FILES": true });

              settedParent.send("This is your channel where you can request a design.\nI will respond as soon as possible.\nGreetings Gio.");

          })
        })
        return;
      }
      if (!message.member.roles.has(gioRank.id)) {
        return message.channel.send(":x: You don't have permissions to send a request to this designer")
      }
    }

    else {
      return message.channel.send(":x: Unknown designer, check -designers for a list of know designers")
    }
  }

  if (command === "-close") {

    // return message.channel.send(":no_entry_sign: **This function is currently disabled**")

    if (message.member.hasPermissions('MANAGE_CHANNELS')) {

      const nathanId = "525265308991356930";
      const gioId = "525265338338639902";

      if (message.channel.parentID == nathanId) {
        return message.channel.delete();
      }

      if (message.channel.parentID == gioId) {
        return message.channel.delete();
      }

      else {
        return message.channel.send(":x: You can only close request channels.")
      }
    }

    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.channel.send(":x: You don't have permissions to close a channel. *MANAGE_CHANNELS is required*")
    }
  }
  if (command === "-designers") {

    // return message.channel.send(":no_entry_sign: **This function is currently disabled**")

    var botIcon = bot.user.displayAvatarURL;
    var designersEmbed = new discord.RichEmbed()
      .setTitle("Known designers for -design")
      .setThumbnail(botIcon)
      .setColor("#FA8072")
      .addField("nathan", "@Nathantjuhh#8583")
      .addField("gio", "@LilGekyume#0615")
      .setFooter("Bot Version 1.0")
    
    return message.channel.send(designersEmbed)
  }
});

bot.login("TOKEN_HIDDEN")
