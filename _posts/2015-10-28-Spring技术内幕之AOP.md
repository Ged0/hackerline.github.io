---
layout: post
title: Spring技术内幕之AOP
categories: [Java]
---
##{{ page.title }}

###AOP:Aspect-Oriented-Programming  面向切面编程

####Spring AOP组成：
advice:通知  
pointcut：切点  
advisor：通知器，将advice和pointcut结合在一起

####Spring AOP的实现方式：  
1.JVM动态代理  
2.Cglib

####Spring AOP使用：使用*ProxyFactory*类来定义切面

使用ProxyFactoryBean和AOP:  
1.定义使用的Advisor  
2.定义ProxyFactoryBean  
&#8194;&#8194;  proxyInterface   代理类的接口  
&#8194;&#8194;  inteceptorNames 需要定义的通知器  
&#8194;&#8194;  target base对象
		
		
####Spring AOP实现细节：
在BeanFactory的getObject()方法中，对base Object进行代理和增强，来实现AOP  
AopProxyFactory生成AopProxy对象，生成代理对象所需要的信息都封装到AdvisedSupport中  
ProxyCreatorSupport是AdvisedSuppport的子类，用于生成AopProxy

**生成：**  
1.如果对象是接口类，使用JDKDynamicAopProxy(config)  
2.否则使用CglibProxyFactory.createCglibProxy(config)  
	
**JDKDynamicAopProxy:**

JDKDynamicAopProxy 中，调用类ReflectiveMethodInvocation的proceed()对方法进行切面封装。
ReflectiveMethodInvocation的proceed()方法中，对拦截器链进行遍历。如果发现匹配的拦截器，则调用拦截器的invoke()方法来对method进行包装，紧接着再次调用MethodInvocation的proceed()方法，直到将拦截器链便利一遍位置。通过不断的相互调用，在方法执行的前后，添加了数个拦截器，来实现AOP功能。
	
Cglib2AopProxy流程大致和JDKDynamicAopProxy一样。
	
####Spring AOP中ProxyFactory可以这样来使用： 
	Target t = new Target(); //源对象
	ProxyFactory aopFactory = new ProxyFactory(target);
	//向工厂中添加切面 
	aopFactory.addAdvisor(yourAdvisor);
	aopFactory.addAdvice(yourAdvice);
	//获取代理对象
	Target proxyTarget = (Target)aopFactory.getProxy(); 
	
	