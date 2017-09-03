TopBar.init();
act = Utils.getAction();

$("a[href='/ucenter/" + act + "']").parent().addClass("current");