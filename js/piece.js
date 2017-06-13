var Piece = function(game) {

	// ��Ϸ����
	this.game = game;
	
	// �Ƿ�Ϊ��ԵԪ��
	this.isEdge = false;

	// �Ƿ��ű�ԵԪ��
	this.atEdge = false;
	
	// ͼƬdomԪ��
	this.dom = null;
	
	// ͼƬԪ��
	this.img = null;
	
	// ͼƬԪ����Դ
	this.src = null;
	
	// �켣Ԫ��
	this.track = null;
	
	// �Ƿ������Ϊ�켣
	this.isTracked = false;
		
	// ѡ�б��Ԫ��
	this.selected = null;
	
	// ͼƬ��������
	this.x = 0;
	
	// ͼƬ��������
	this.y = 0;
	
	// ͼƬ��˸Id
	this.flashId = null;
	
	// ͼƬ�Ƿ���
	this.onClicked = false;
	
	// ��˸����
	this.flashCount = 0;
	
	this.init();

}

Piece.prototype = {

	// ��ʼ��
	init : function() {

		this.dom = document.createElement("div");
		this.dom.className = "piece";		
		
		this.selected = document.createElement("img");	
			
	},
	
	// ��ʼ��ͼƬ
	initImg : function() {
	
		this.img = document.createElement("img");
		
		this.dom.appendChild(this.img);
	
	},
	
	// �����㷨���ʼ��trackԪ��
	initTrack : function() {

		if (this.flashId != null) {
			
			// ֹͣ��˸
			this.stopFlash();
			
		}		
		
		//alert("initTrack middle");
		if (this.track != null) {
		
			return;
		}
		
		this.onClicked = false;
		
		this.dom.removeChild(this.img);
	
		this.track = document.createElement("div");
		this.track.className = "track";
		this.dom.appendChild(this.track);
	
	},
	
	// λͼƬ������Դ
	setImgSrc : function(src) {

		this.src = src;
	
	},
	
	// ΪͼƬ���ö�ά����λ��
	setPosition : function(x, y) {
	
		this.x = x;
		this.y = y;
	
	},
	
	// ΪͼƬ����ѡ��Ԫ��
	setSelected : function() {
		
		if (this.flashCount ++ % 2 == 0) {
			
			//this.dom.removeChild(this.img);
			//this.selected.src = "img/selected.gif";
			//this.dom.appendChild(this.selected);	
			this.img.src = "img/pieces/flash.gif";
		
		} else {
			
			//if (this.selected != null) {
						
			//	this.dom.removeChild(this.selected);			
			
			//}
			
			this.img.src = this.src;
			//this.dom.appendChild(this.img);
		
		}
					
	},
	
	// �����Ƿ�Ϊ��ԵԪ��
	setEdge : function(isEdge) {
	
		this.isEdge = isEdge;
	
	},
	
	// �����Ƿ��ű�ԵԪ��
	setAtEdge : function(atEdge) {
	
		this.atEdge = atEdge;
	
	},
	
	// ��ʼ��˸
	flash : function() {
		
		var _this = this;
		this.flashId = setInterval(function() {_this.setSelected();}, 500);

	},
	
	// ֹͣ��˸
	stopFlash : function() {
	
		clearInterval(this.flashId);
		
		if (this.flashCount % 2 == 1) {
			
			//if (this.selected != null) {
			
			//	this.dom.removeChild(this.selected);
			
			//}
			
			this.img.src = this.src;
			//this.dom.appendChild(this.img);			
		
		}
			
	},
		
	// ����ѡ����ڲ�����
	onClick : function() {
		
		if (this.onClicked) {
			
			return;
		
		}
	
		var _this = this;
		
		this.img.onclick = function() {
		
			if (!document.getElementById("start").disabled) {
			
				return;
			
			}
		
			if (_this.onClicked) {
			
				return;
			
			}

			if (_this.checkPiece()) {

				return;
			
			}
			
			_this.flash();
			_this.onClicked = true;
		
		};
	
	},
	
	// ����Ƿ��б������ͼƬ
	checkPiece : function() {
		
		for (var i = 0; i < this.game.pieceList.length; i ++) {
			
			if (this.game.pieceList[i].onClicked && !this.game.pieceList[i].equal(this)) {
				
				if (this.game.pieceList[i].equalImage(this)) {
					
					//alert("The same Image");
					this.searchTrack(this.game.pieceList[i]);
				
				} else {
					
					this.game.pieceList[i].stopFlash();
					this.game.pieceList[i].onClicked = false;
					this.onClicked = false;
					
					return false;
				
				}
				
				return true;
			
			} else {
			
				continue;
			
			}
		
		}
		
		return false;
	
	},	
	
	// �Ƿ�Ϊͬһ������
	equal : function(piece) {
	
		return (this.x == piece.x && this.y == piece.y);
	
	},
	
	// �Ƿ�Ϊͬһ��ͼƬ
	equalImage : function(piece) {

		return this.src == piece.src;
	
	},
	
	// ��Ѱ·��
	searchTrack : function(piece) {
		
		if (this.isNear(piece)) {
				
			this.linkTrack(piece);
			
			return;
		}		
		
		if (this.isReach(piece) || this.isReach2(piece)) {
				
			this.linkTrack(piece);
			
			return;
		}		
				
	},
	
	// �Ƿ�����
	isNear : function(piece) {
	
		var a = (Math.abs(piece.x - this.x) == 1) && (piece.y == this.y)
			|| (Math.abs(piece.y - this.y) == 1) && (piece.x == this.x);
	
		return a;
	},
	
	// ֱ��
	isStraightReach : function(piece) {
		//alert("isStraightReach");
		if (this.isNear(piece)) {
			
			return true;
		
		}
		
		var a = false;
		var b = false;

		// ��y�᷽������
		if (this.x == piece.x) {
			//alert("!!!!!!!!!!!");
			for (var i = this.min(this.y, piece.y) + 1; i < this.max(this.y, piece.y); i ++) {
				//alert("this.x == piece.x: " + piece.x + "," + i);
				if (this.game.pieceMap.get(piece.x + "," + i).isPass()) {
				
					a = true;
					
					this.game.trackList.push(this.game.pieceMap.get(piece.x + "," + i));
					
					continue;
				} else {
				
					a = false;
					this.game.trackList = [];
					
					return a;	
				}
			
			}
						
		}
		
		// ��x�᷽������
		if (this.y == piece.y) {
			//alert("!!!!!!!!!!!");
			for (var i = this.min(this.x, piece.x) + 1; i < this.max(this.x, piece.x); i ++) {
				//alert("this.y == piece.y: " + i + "," + piece.y);
				if (this.game.pieceMap.get(i + "," + piece.y).isPass()) {
					
					b = true;
					this.game.trackList.push(this.game.pieceMap.get(i + "," + piece.y));
					
					continue;
				} else {
				
					b = false
					this.game.trackList = [];
					
					return b;
				}
			
			}
			
		}

		return a || b;
	},

	
	// ��һ��������
	isReach1 : function(piece) {
		//alert("isReach1");
		var corner_1 = this.game.pieceMap.get(this.x + "," + piece.y);
		var corner_2 = this.game.pieceMap.get(piece.x + "," + this.y);
						
		var _this = this;

		
		if ((_this.isStraightReach(corner_1))
			&& (corner_1.isStraightReach(piece))
			&& corner_1.isPass()) {
			
				//alert("corner_1: " + this.x + "," + piece.y);
				this.game.trackList.push(corner_1);
			
				return true;
		}
	
		if ((_this.isStraightReach(corner_2))
			&& (corner_2.isStraightReach(piece))
			&& corner_2.isPass()) {
				//alert("corner_2: " + piece.x + "," + this.y);
				this.game.trackList.push(corner_2);
			
			return true;
		}

		return false;
	},
	
	// ֱ�ӻ��һ��������
	isReach : function(piece) {
		
		var a = this.isStraightReach(piece);
		
		var b = this.isReach1(piece);
				
		return a || b;
	},
	
	// ������������
	isReach2 : function(piece) {
			
		// ��x����������
		for (var i = this.x + 1; i < 17; i ++) {
			
			if (!this.game.pieceMap.get(i + "," + this.y).isPass()) {
				
				this.game.trackList = [];
				
				break;
				
			} else if (this.game.pieceMap.get(i + "," + this.y).isReach(piece)
				&& this.game.pieceMap.get(i + "," + this.y).isPass()) {
				
				this.game.trackList.push(this.game.pieceMap.get(i + "," + this.y));
					
				return true;
			}	
		
		}
		
		// ��x������
		for (var i = this.x - 1; i >= 0; i --) {
			
			if (!this.game.pieceMap.get(i + "," + this.y).isPass()) {
			
				this.game.trackList = [];
				
				break;
				
			} else if (this.game.pieceMap.get(i + "," + this.y).isReach(piece)
				&& this.game.pieceMap.get(i + "," + this.y).isPass()) {
			
				this.game.trackList.push(this.game.pieceMap.get(i + "," + this.y));
					
				return true;
			}
		
		}
		
		// ��y������
		for (var i = this.y - 1; i >= 0; i --) {
			
			if (!this.game.pieceMap.get(this.x + "," + i).isPass()) {
				
				this.game.trackList = [];
				
				break;
				
			} else if (this.game.pieceMap.get(this.x + "," + i).isReach(piece)
				&& this.game.pieceMap.get(this.x + "," + i).isPass()) {
				
				this.game.trackList.push(this.game.pieceMap.get(this.x + "," + i));
					
				return true;
			}
		
		}

		// ��y����������
		for (var i = this.y + 1; i < 12; i ++) {

			if (!this.game.pieceMap.get(this.x + "," + i).isPass()) {
				
				this.game.trackList = [];
				
				break;
			} else if (this.game.pieceMap.get(this.x + "," + i).isReach(piece)
				&& this.game.pieceMap.get(this.x + "," + i).isPass()) {
				
				this.game.trackList.push(this.game.pieceMap.get(this.x + "," + i));
					
				return true;
			}
		
		}
		
		return false;
	},
	
	// ·������
	linkTrack : function(piece) {
	
		this.initTrack();
		piece.initTrack();
		this.changeScore();
		this.showTrack(piece);
			
	},
	
	// ��ʾ�㼣
	showTrack : function(piece) {
	
		this.game.trackList.push(piece);
		this.track.className = "track2";
		
		for (var i = 0; i < this.game.trackList.length; i ++) {
			//alert(i);
			this.game.trackList[i].track.className = "track2";
		
		}
		
		var _this = this;
		setTimeout(function() {_this.hideTrack()}, 500);
	
	},
	
	// �����㼣
	hideTrack : function() {
	
		for (var i = 0; i < this.game.trackList.length; i ++) {
			
			this.game.trackList[i].track.className = "track";
			
		}
			
		this.game.trackList = [];
		this.track.className = "track";
		this.isTracked = true;
		
	},
	
	// ��������
	changeScore : function() {
			
		this.game.score += 100;
		document.getElementById("score").innerHTML = this.game.score;		
	
	},
	
	min : function(a, b) {
	
		if (a < b) {
		
			return a;
		
		} else {
		
			return b;
			
		}
		
	},
	
	max : function(a, b) {
	
		if (a > b) {
		
			return a;
		
		} else {
		
			return b;
		
		}
	
	},
	
	// �ж��Ƿ�ͨ��
	isPass : function() {
	
		return this.track != null;
	}

}