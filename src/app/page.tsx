"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, FileText, ChevronRight, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const ProjectDashboard = () => {
  const [projectType, setProjectType] = useState('IND申請');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showEstimate, setShowEstimate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    developmentStage: '',
    targetDisease: '',
    moleculeType: '',
    regulatoryStrategy: '',
    timeline: '',
  });

  const generateEstimate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowEstimate(true);
      setIsModalOpen(false);
      setCurrentStep(1);
    }, 3000);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setProjectDetails({
      developmentStage: '',
      targetDisease: '',
      moleculeType: '',
      regulatoryStrategy: '',
      timeline: '',
    });
  };

  const renderEstimationStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">基本情報入力</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">プロジェクトタイプ</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="IND申請">IND申請</option>
                  <option value="Phase I/II臨床試験">Phase I/II臨床試験</option>
                  <option value="CRO選定支援">CRO選定支援</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">開発ステージ</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.developmentStage}
                  onChange={(e) => setProjectDetails({...projectDetails, developmentStage: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="preclinical">前臨床</option>
                  <option value="phase1">Phase I</option>
                  <option value="phase2">Phase II</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">対象疾患</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.targetDisease}
                  onChange={(e) => setProjectDetails({...projectDetails, targetDisease: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="cancer">がん</option>
                  <option value="rare">希少疾患</option>
                  <option value="chronic">慢性疾患</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">分子種別</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.moleculeType}
                  onChange={(e) => setProjectDetails({...projectDetails, moleculeType: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="antibody">抗体医薬品</option>
                  <option value="smallMolecule">低分子医薬品</option>
                  <option value="cellTherapy">細胞治療</option>
                </select>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => setCurrentStep(2)}
            >
              次へ
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">規制戦略</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.regulatoryStrategy}
                  onChange={(e) => setProjectDetails({...projectDetails, regulatoryStrategy: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="standard">標準的な申請</option>
                  <option value="expedited">迅速審査</option>
                  <option value="conditional">条件付き承認</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">目標タイムライン</label>
                <select 
                  className="w-full p-2 rounded border"
                  value={projectDetails.timeline}
                  onChange={(e) => setProjectDetails({...projectDetails, timeline: e.target.value})}
                >
                  <option value="">選択してください</option>
                  <option value="6months">6ヶ月以内</option>
                  <option value="12months">12ヶ月以内</option>
                  <option value="18months">18ヶ月以内</option>
                </select>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={generateEstimate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  見積もり生成中...
                </>
              ) : (
                '見積もりを生成'
              )}
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">見積もり結果</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="mb-4">
                <h4 className="font-medium">推奨チーム構成</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">海外エキスパート（45,000円/時間） x 255時間</p>
                  <p className="text-sm">本邦エキスパート（25,000円/時間） x 135時間</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium">想定タイムライン</h4>
                <p className="text-sm mt-1">6ヶ月（基本計画から申請完了まで）</p>
              </div>
              <div>
                <h4 className="font-medium">見積金額（税込）</h4>
                <p className="text-2xl font-bold text-blue-600 mt-1">¥17,820,000</p>
                <div className="text-xs text-gray-500">
                  <p>税抜：¥16,200,000</p>
                  <p>消費税：¥1,620,000</p>
                </div>
              </div>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                setCurrentStep(1);
                setProjectDetails({
                  developmentStage: '',
                  targetDisease: '',
                  moleculeType: '',
                  regulatoryStrategy: '',
                  timeline: '',
                });
              }}
            >
              新しい見積もりを作成
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/xcare-logo.png"
            alt="xcare Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold">プロジェクト管理</h1>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          新規プロジェクト作成
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Calendar className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">進行中のプロジェクト</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <FileText className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">完了したプロジェクト</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Users className="text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">利用可能エキスパート</p>
                <p className="text-2xl font-bold">293</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Estimation Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>開発支援見積自動生成</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleModalOpen} className="bg-blue-500">
                    見積を生成
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {currentStep === 1 && "プロジェクト情報入力"}
                      {currentStep === 2 && "規制戦略・タイムライン設定"}
                      {currentStep === 3 && "見積もり結果"}
                    </DialogTitle>
                  </DialogHeader>
                  {renderEstimationStep()}
                </DialogContent>
              </Dialog>
            </div>
            
            {showEstimate && (
              <>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">推奨チーム構成とリソース配分</h3>
                      <p className="text-sm text-gray-600">海外エキスパート（45,000円/時間） x 255時間</p>
                      <p className="text-sm text-gray-600">本邦エキスパート（25,000円/時間） x 135時間</p>
                      <p className="text-sm text-gray-600">想定期間：6ヶ月</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold">概算見積（税込）</h3>
                      <p className="text-2xl font-bold text-blue-600">¥17,820,000</p>
                      <p className="text-xs text-gray-500">税抜：¥16,200,000</p>
                      <p className="text-xs text-gray-500">消費税：¥1,620,000</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>IND申請支援</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">2024年4月 - 2024年9月</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">6ヶ月</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">5名のエキスパート</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">申請書類作成支援</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              {/* Timeline Section */}
              <Card>
                <CardHeader>
                  <CardTitle>IND申請支援 タイムライン</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border-l-4 border-blue-500">
                      <div className="flex-1">
                        <h3 className="font-bold">現状把握（5時間）</h3>
                        <p className="text-sm text-gray-600">事業計画の把握及びディスカッション</p>
                      </div>
                      <p className="text-sm text-gray-600">¥225,000</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-l-4 border-green-500">
                      <div className="flex-1">
                        <h3 className="font-bold">ギャップ分析（40時間）</h3>
                        <p className="text-sm text-gray-600">各種資料レビュー及びINDへ向けた分析</p>
                      </div>
                      <p className="text-sm text-gray-600">¥1,800,000</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-l-4 border-yellow-500">
                      <div className="flex-1">
                        <h3 className="font-bold">Pre-IND Meeting準備（120時間）</h3>
                        <p className="text-sm text-gray-600">各種文書・資料作成の支援</p>
                      </div>
                      <p className="text-sm text-gray-600">¥5,400,000</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-l-4 border-purple-500">
                      <div className="flex-1">
                        <h3 className="font-bold">IND申請文書作成（90時間）</h3>
                        <p className="text-sm text-gray-600">申請資料の作成及び提出支援</p>
                      </div>
                      <p className="text-sm text-gray-600">¥4,050,000</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-l-4 border-red-500">
                      <div className="flex-1">
                        <h3 className="font-bold">プロジェクトマネジメント（135時間）</h3>
                        <p className="text-sm text-gray-600">本邦エキスパートによる管理</p>
                      </div>
                      <p className="text-sm text-gray-600">¥3,375,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default ProjectDashboard;