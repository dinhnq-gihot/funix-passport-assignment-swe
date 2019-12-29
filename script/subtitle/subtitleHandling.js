class SubtitleHandling {
   static parseSub(data){
      let result = [];
      let items = data.split("\n\r\n");
      let self = this;
      $.each(items, function(index, el) {
         let cut = el.split("\r\n");
         let time = cut[1].split("-->");
         try {
            result.push(cut[2].trim());
         } catch (e) {
            result.push("");
         }
      });
      return result;
   }

   static parseYoutubeSub(f){
      let result = [];
      let pattern = /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|$))\n([\s\S]*?(?=\n{2}|$))/gm;
      let _regExp = new RegExp(pattern);
      let matches;

      f = f.replace(/\r\n|\r|\n/g, '\n')

      while ((matches = pattern.exec(f)) != null) {
         result.push(matches[4] +"\r\n"+ matches[5]);
      }
      return result;
   }

   static timeToMillisecond(str) {
      str = str.replace(".", ",");
      let splits = str.split(":");
      let millisecond = 0;
      millisecond += parseInt(splits[0])*3600*1000;
      millisecond += parseInt(splits[1])*60*1000;
      let cut = splits[2].split(",");
      millisecond += parseInt(cut[0])*1000;
      millisecond += parseInt(cut[1]);

      return millisecond;
   }
}
