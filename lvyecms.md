## 标题/关键字/概述
<title><if condition=" isset($SEO['title']) && !empty($SEO['title']) ">{$SEO['title']}</if>{$SEO['site_title']}</title>
<meta name="keywords" content="{$SEO['keyword']}" />
<meta name="description" content="{$SEO['description']}" />

## 站点名称
{$Config.sitename}

## 首页链接（站点根目录）
{$config_siteurl}

## 静态文件目录
{$config_siteurl}statics/

## 通用静态文件集中目录
{$config_siteurl}statics/assets/

## 调用外置模版（如引入header.php）
<template file="Content/head.php"/>
<template file="Content/header.php"/>

## 获取栏目信息

### 栏目名称/地址
{:getCategory($catid,'catname')}
{:getCategory($catid,'url')}
{:getCategory($catid,'parentid')}
[参考文档](http://doc.lvyecms.com/225720)
使用示例：
```
<a href="{:getCategory(9,'url')}" target="_blank">
```
```
<content action="category" catid="getCategory($catid,'parentid')" order="listorder ASC">
```
## 调用信息

### 当前位置
```
<a href="{$config_siteurl}">首页</a> &gt;
    <navigate catid="$catid" space=" &gt; " />
```
### 列表
1. URL：{$vo.url}
2. 标题：{$vo.title|str_cut=###,15}
3. 缩略图地址：{$vo.thumb}
4. 更新时间 {$vo.updatetime|date="m-d",###}
5. 分页：{$pages}
列表分页需要在content标签中声明$page:
```
<content action="lists" catid="$catid" order="id DESC" num="4" page="$page"> 
    .. HTML ..
</content>
```
6. 摘要 {$vo.description}
//filter: |str_cut=###,15 means cut the top 15 strings.

### 内容页
1. {$title}
2. {$updatetime}
3. {$content}
4. {$pages} //分页
5. 上下页：pre next标签
6. {$username}
 <ul>
    <li>上一篇：<pre target="1" msg="已经没有了" /> </li>
    <li>下一篇：<next target="1" msg="已经没有了" /> </li>
 </ul>

### 详情页调出图集
<volist name="gallery" id="vo">
    <img src="{$vo.url}" title="{$vo.alt}">
</volist>

### 一二级栏目循环
<content action="category" catid="0"  order="listorder ASC" >
    <volist name="data" id="vo">
        <if condition=" $vo['child'] ">
            <li  class="<if condition="in_array($catid,explode(',',$vo['arrchildid']))">active</if>"><a href="{$vo.url}" title="{$vo.description}">{$vo.catname}</a> <!--调出一级栏目-->
                <ul style="display: none; z-index:899">
                    <content action="category" catid="$vo['catid']"  order="listorder ASC" >
                        <volist name="data" id="r">
                            <li <if condition=" $i%2 == 0 "> class="noborder"</if>><a href="{$r.url}" class="stmenu" title="{$r.catname}">{$r.catname}</a></li> <!--调出二级栏目-->
                        </volist>
                    </content>
                </ul>
            </li>
        <else />
            <!--当没有二级目录时的操作-->
            <!--{$vo.catname}-->
            <!--<li>
            <a href="{$vo.url}" title="{$vo.description}">{$vo.catname}</a>
            </li> -->
        </if>
    </volist>
</content>
栏目缩略图：{$vo.image}

### 列表循环
```
<content action="lists" catid="$catid" order="id DESC" num="10" moreinfo="1">
    <volist name="data" id="vo">

<a href="{$vo.url}" target='_blank'><img src="{$vo.thumb}" alt='{$vo.description}' width='319' height='195' />{$vo.title|str_cut=###,12}</a>

    </volist>
</content>
```
列表的第一条特殊处理：
```
<if condition=" $i == 1 ">
//第一条的处理方式
<else />
//非第一条的处理方式
</if>
```

## FAQ
1. 网站迁移、更换域名、移动目录相关问题
    1. 更换域名目录的步骤参考官方文档 [网站迁移/域名更换](http://doc.lvyecms.com/225623)
    2. 上传到服务器，移动目录后打开来出现一片空白或错误页？
    尝试删除#runtime目录，然后尝试登录 admin.php 清除相关缓存
    3. 网站位置迁移后，栏目列表、文字列表的URL没有更新？
    尝试刷新栏目URL列表 => 登录后台 -> 栏目列表 -> 更新栏目缓存 
    批量文章URL => 登录后台 -> 发布管理 -> 批量更新URL


    
<get table="category" catid="$catid" num="1">
<volist name="data" id="vo">
<if condition="$vo.parentideq 0">
                  {$vo.catname}
<else/>
<get table="category" catid="$vo['parentid']" num="1">
<volist name="data" id="vo1">
<if condition="$vo1.parentid eq 0">
                        {$vo1.catname}
<else/>
<get table="category" catid="$vo1['parentid']" num="1">
<volist name="data" id="vo2">
<if condition="$vo2.parentid eq 0">
                              {$vo2.catname}
</if>
</volist>
</get>
</if>
</volist>
</get>
</if>
</volist>
</get>


<content action="category" catid="getCategory($catid,'parentid')"  order="listorder ASC" >
<volist name="data" id="vo">
<li <if condition=" $catideq $vo['catid'] "> class='subhover'</if>><a href='{$vo.url}'   title="{$vo.catname}">{$vo.catname}</a></li>
</volist>
</content>
