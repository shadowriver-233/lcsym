
//搜索框id
var ele1 = document.getElementById("searchname");
//表单ID
var ele2 = document.getElementById("fl");    

//更改搜索引擎
function changeBaidu(){
	
	ele1.setAttribute('name','wd');
	
	ele2.setAttribute('action','http://www.baidu.com/baidu');	   
    
    document.getElementById("baidu").style.cssText = "transition:all 0.4s ease-in-out;";
}

function changeBiying(){
	 
	ele1.setAttribute('name','q');
	
	ele2.setAttribute('action','http://cn.bing.com/search');

}

function changeGoogle(){
	
	ele2.setAttribute('action','http://www.google.com/search');

}





//时钟

    function startTime() {
    
        //获取时间对象
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        
        
        // 在 numbers<10 的数字前加上 0
        m = checkTime(m);
        
        document.getElementById("clock").innerHTML = h + ":" + m ;
        var t = setTimeout(function(){ startTime() }, 500);
    }
    
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    

function focusEngine2(){
    $("#baidu").css("box-shadow","inset 0 0 78px rgba(0, 0, 0, 0.4), 0 0 79px rgba(0, 0, 0, 0.3),0 0 80px rgba(0, 0, 0, 0.2), 0 0 85px rgba(0, 0, 0, 0.1)");
    $("#baidu").css("color","white");
    $("#baidu").click(function(){
        
        $(this).css("box-shadow","inset 0 0 78px rgba(0, 0, 0, 0.4), 0 0 79px rgba(0, 0, 0, 0.3),0 0 80px rgba(0, 0, 0, 0.2), 0 0 85px rgba(0, 0, 0, 0.1)");
        $(this).css("color","white");
    	$("#biying").removeAttr('style');
        $("#google").removeAttr('style');
    		 
    })

    $("#biying").click(function(){
    
    	$(this).css("box-shadow","inset 0 0 78px rgba(0, 0, 0, 0.4), 0 0 79px rgba(0, 0, 0, 0.3),0 0 80px rgba(0, 0, 0, 0.2), 0 0 85px rgba(0, 0, 0, 0.1)");
        $(this).css("color","white");
    	$("#baidu").removeAttr('style');
    	$("#google").removeAttr('style');
  
    })

     $("#google").click(function(){
    	
    	$(this).css("box-shadow","inset 0 0 78px rgba(0, 0, 0, 0.4), 0 0 79px rgba(0, 0, 0, 0.3),0 0 80px rgba(0, 0, 0, 0.2), 0 0 85px rgba(0, 0, 0, 0.1)");
        $(this).css("color","white");
    	$("#baidu").removeAttr('style');
        $("#biying").removeAttr('style');
     
    })
}


//搜索引擎选中效果
$(document).ready(function(){
    //默认选择百度
    // box-shadow: inset 0 0 78px rgba(0, 0, 0, 0.4), 0 0 79px rgba(0, 0, 0, 0.3),0 0 80px rgba(0, 0, 0, 0.2), 0 0 85px rgba(0, 0, 0, 0.1);
    //color: white;
	focusEngine2();

    $("#historyButton").click(function(){
       
        if($("#history").css("display")=="none"){
            $("#history").css("display","block");
        }else{
            $("#history").css("display","none");
        }
    })

    
    startTime();
   
    $("#clock").click(function(){
        $("div").css("display","none");
    });
    
    var obj1 = document.getElementById("l01");
    var obj2 = document.getElementById("js2"); 
//更换背景
$("#changewall").click(function(){
   
   obj1.setAttribute("href","css/surprise_css.css");
    
   obj1.setAttribute("src","js/surprise_js.js");
    
   
          
});  
   
    
});

//历史记录功能

//搜索历史部分
var searchArr;
//定义一个search的，判断浏览器有无数据存储（搜索历史）
if(localStorage.search){
    //如果有，转换成 数组的形式存放到searchArr的数组里（localStorage以字符串的形式存储，所以要把它转换成数组的形式）
    searchArr= localStorage.search.split(",")
}else{
    //如果没有，则定义searchArr为一个空的数组
    searchArr = [];
}
//把存储的数据显示出来作为搜索历史
MapSearchArr();
$(":submit").on("click", function(){
    var val = $(":text").val();
    //点击搜索按钮时，去重
    KillRepeat(val);
    //去重后把数组存储到浏览器localStorage
    localStorage.search = searchArr;
    //然后再把搜索内容显示出来
    MapSearchArr();
});
function MapSearchArr(){
    var tmpHtml = "";
    for (var i=0;i<searchArr.length;i++){
        tmpHtml += "<span class='sl' onclick ='visitHistory(this)'>" + searchArr[i] +"</span>&nbsp;"+"<span class='sr' onclick='delHistory(this)'>"+"x"+"</span>"+"<br>";
    }
    $("#historytext").html(tmpHtml);
}

// 去重
function KillRepeat(val){
    var kill = 0;
    for (var i=0;i<searchArr.length;i++){
        if(val===searchArr[i]){
            kill ++;
        }
    }
    if(kill<1){
        searchArr.push(val);
    }
}


//删除历史记录
function delHistory(data) {
	var vall = $(data).prev().text();
	for (var i = 0; i < searchArr.length; i++) {
		if (vall === searchArr[i]) {
			searchArr.splice(i, 1);
			localStorage.search = searchArr;
			$(data).prev().remove();
			MapSearchArr();
		}
	}
}
//访问历史记录
function visitHistory(data){
    var v = $(data).text();   
    $("#searchname").val(v);
    $("#fl").submit();
   
}
//

//拖拽历史记录栏
$(function(){
    //移动窗口的步骤
    //1、按下鼠标左键
    //2、移动鼠标
    $('#history').mousedown(function(e){
        // e.pageX
        var positionDiv = $(this).offset();//获得绝对定位后相对于边界的偏移量
        var distenceX = e.pageX - positionDiv.left;
    
        var distenceY = e.pageY - positionDiv.top;//鼠标在圆形div内，相较于最上点和最左点的偏移量
        //alert(distenceX)
        // alert(positionDiv.left);
        $(document).mousemove(function(e){
            var x = e.pageX - distenceX;
            
            var y = e.pageY - distenceY;
            if(x<0){
                x=0;
            }else if(x>$(document).width()-$('#history').outerWidth(true)){
                x = $(document).width()-$('#history').outerWidth(true);
            }
            if(y<0){
                y=0;
            }else if(y>$(document).height()-$('#history').outerHeight(true)){
                y = $(document).height()-$('#history').outerHeight(true);
            }
            $('#history').css({
                'left':x+'px',
                'top':y+'px'
            });
        });
        $(document).mouseup(function(){
            $(document).off('mousemove');
        });
    });
});

    window.onload= function(){
       
        
      
//更换背景
$("#changewall").click(function(){
     $("link").css("href","css/surprise_css.css")
	 $("#js2").css("src","js/surprise_js.js");	
		
           
});
    }
    
